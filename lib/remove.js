const fs = require('fs');
const { banner, sally, success, fail, ask } = require('./ui');
const claudeCode = require('./modules/claude-code');
const gitHooks = require('./modules/git-hooks');
const { CACHE_DIR } = require('./quips');

const MODULES = [claudeCode, gitHooks];

async function remove() {
  banner();
  console.log('');
  sally("Really? After everything I've done for your codebase?");
  console.log('');

  const answer = await ask('Remove Sally from your tools? (y/N)');

  if (answer !== 'y' && answer !== 'yes') {
    console.log('');
    sally('Smart. I knew you needed me.');
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
  sally("Fine. I'm gone. Good luck out there without me.");
  console.log('');
}

module.exports = { remove };
