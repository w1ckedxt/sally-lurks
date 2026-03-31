const fs = require('fs');
const path = require('path');
const os = require('os');

const name = 'Claude Code';
const description = 'status line with Sally quips';

const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');
const SCRIPT_DEST = path.join(CLAUDE_DIR, 'sally-lurks-statusline.sh');
const BACKUP_FILE = path.join(CLAUDE_DIR, 'sally-lurks-backup.json');
const SCRIPT_SRC = path.join(__dirname, '..', '..', 'scripts', 'claude-code-statusline.sh');

async function install() {
  if (!fs.existsSync(CLAUDE_DIR)) {
    throw new Error('~/.claude directory not found');
  }

  // Copy status line script
  fs.copyFileSync(SCRIPT_SRC, SCRIPT_DEST);
  fs.chmodSync(SCRIPT_DEST, '755');

  // Read current settings
  let settings = {};
  if (fs.existsSync(SETTINGS_FILE)) {
    settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  }

  // Backup existing status line config
  if (settings.statusLine) {
    const existing = settings.statusLine.command || '';
    if (!existing.includes('sally-lurks')) {
      fs.writeFileSync(BACKUP_FILE, JSON.stringify({ statusLine: settings.statusLine }, null, 2));
    }
  }

  // Set Sally's status line
  settings.statusLine = {
    type: 'command',
    command: `bash ${SCRIPT_DEST}`,
  };

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

async function remove() {
  let removed = false;

  // Remove script
  if (fs.existsSync(SCRIPT_DEST)) {
    fs.unlinkSync(SCRIPT_DEST);
    removed = true;
  }

  // Restore backup or remove status line config
  if (fs.existsSync(SETTINGS_FILE)) {
    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));

    if (fs.existsSync(BACKUP_FILE)) {
      const backup = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
      settings.statusLine = backup.statusLine;
      fs.unlinkSync(BACKUP_FILE);
    } else if (settings.statusLine?.command?.includes('sally-lurks')) {
      delete settings.statusLine;
    }

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    removed = true;
  }

  return removed;
}

function isInstalled() {
  if (!fs.existsSync(SETTINGS_FILE)) return false;
  try {
    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    return settings.statusLine?.command?.includes('sally-lurks') || false;
  } catch {
    return false;
  }
}

module.exports = { name, description, install, remove, isInstalled };
