const fs = require('fs');
const { banner, sally, success, fail, ask } = require('./ui');
const claudeCode = require('./modules/claude-code');
const gitHooks = require('./modules/git-hooks');
const { CACHE_DIR } = require('./quips');

const MODULES = [claudeCode, gitHooks];

async function remove() {
  banner();
  console.log('');
  sally("Really? After everything we've been through?");
  console.log('');

  const answer = await ask('Remove Sally from your tools? (y/N)');

  if (answer !== 'y' && answer !== 'yes') {
    console.log('');
    sally('Smart choice. I knew you had taste.');
    process.exit(0);
  }

  console.log('');

  for (const mod of MODULES) {
    try {
      const removed = await mod.remove();
      if (removed) success(`Removed from ${mod.name}`);
    } catch (err) {
      fail(`${mod.name} - ${err.message}`);
    }
  }

  // Clean cache
  try {
    if (fs.existsSync(CACHE_DIR)) {
      fs.rmSync(CACHE_DIR, { recursive: true });
      success('Cache cleared');
    }
  } catch {
    // Best effort
  }

  console.log('');
  sally("She's gone. Your terminal feels emptier already.");
  console.log('');
}

module.exports = { remove };
