const { banner, sally, success, fail, dim } = require('./ui');
const { fetchQuips, randomQuip } = require('./quips');
const claudeCode = require('./modules/claude-code');
const gitHooks = require('./modules/git-hooks');

const MODULES = [claudeCode, gitHooks];

async function status() {
  banner();
  console.log('');

  let active = 0;

  for (const mod of MODULES) {
    if (mod.isInstalled()) {
      success(`${mod.name} ${dim('>')} ${mod.description}`);
      active++;
    } else {
      fail(`${mod.name} ${dim('> not installed')}`);
    }
  }

  console.log('');

  if (active > 0) {
    const quips = await fetchQuips();
    sally(randomQuip(quips));
  } else {
    sally("I'm not lurking anywhere. Run sally-lurks to fix that.");
  }
  console.log('');
}

module.exports = { status };
