const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');
const os = require('os');

function detectTools() {
  const tools = [];

  // Claude Code
  if (existsSync(join(os.homedir(), '.claude'))) {
    tools.push({ name: 'Claude Code', id: 'claude-code' });
  }

  // Git
  if (commandExists('git')) {
    tools.push({ name: 'Git', id: 'git-hooks' });
  }

  // VS Code
  if (commandExists('code')) {
    tools.push({ name: 'VS Code', id: 'vscode' });
  }

  // Cursor
  if (commandExists('cursor')) {
    tools.push({ name: 'Cursor', id: 'cursor' });
  }

  return tools;
}

function commandExists(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

module.exports = { detectTools };
