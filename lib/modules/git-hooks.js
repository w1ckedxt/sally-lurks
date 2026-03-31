const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const name = 'Git';
const description = 'post-commit quips';

const MARKER_START = '# >>> SALLY-LURKS (do not edit) >>>';
const MARKER_END = '# <<< SALLY-LURKS <<<';
const HOOK_SRC = path.join(__dirname, '..', '..', 'scripts', 'post-commit-hook.sh');

function findGitRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { stdio: 'pipe' }).toString().trim();
  } catch {
    return null;
  }
}

function getHookPath() {
  const root = findGitRoot();
  if (!root) return null;
  return path.join(root, '.git', 'hooks', 'post-commit');
}

async function install() {
  const hookPath = getHookPath();
  if (!hookPath) {
    throw new Error('not in a git repository');
  }

  const hookDir = path.dirname(hookPath);
  if (!fs.existsSync(hookDir)) {
    fs.mkdirSync(hookDir, { recursive: true });
  }

  const sallySection = fs.readFileSync(HOOK_SRC, 'utf8');

  if (fs.existsSync(hookPath)) {
    const existing = fs.readFileSync(hookPath, 'utf8');

    // Already installed
    if (existing.includes(MARKER_START)) return;

    // Append to existing hook
    fs.writeFileSync(hookPath, existing.trimEnd() + '\n\n' + sallySection);
  } else {
    // Create new hook
    fs.writeFileSync(hookPath, '#!/bin/bash\n\n' + sallySection);
  }

  fs.chmodSync(hookPath, '755');
}

async function remove() {
  const hookPath = getHookPath();
  if (!hookPath || !fs.existsSync(hookPath)) return false;

  const content = fs.readFileSync(hookPath, 'utf8');
  if (!content.includes(MARKER_START)) return false;

  // Remove Sally's section
  const lines = content.split('\n');
  const filtered = [];
  let skipping = false;

  for (const line of lines) {
    if (line.includes(MARKER_START)) {
      skipping = true;
      continue;
    }
    if (line.includes(MARKER_END)) {
      skipping = false;
      continue;
    }
    if (!skipping) {
      filtered.push(line);
    }
  }

  const cleaned = filtered.join('\n').trim();

  // If only shebang remains, remove the file
  if (cleaned === '#!/bin/bash' || cleaned === '') {
    fs.unlinkSync(hookPath);
  } else {
    fs.writeFileSync(hookPath, cleaned + '\n');
  }

  return true;
}

function isInstalled() {
  const hookPath = getHookPath();
  if (!hookPath || !fs.existsSync(hookPath)) return false;
  return fs.readFileSync(hookPath, 'utf8').includes(MARKER_START);
}

module.exports = { name, description, install, remove, isInstalled };
