const { banner, sally, success, fail, info, dim, ask } = require('./ui');
const { detectTools } = require('./detect');
const { fetchQuips } = require('./quips');
const claudeCode = require('./modules/claude-code');
const gitHooks = require('./modules/git-hooks');

const MODULES = {
  'claude-code': claudeCode,
  'git-hooks': gitHooks,
};

const COMING_SOON = {
  'vscode': true,
  'cursor': true,
};

async function install() {
  banner();
  console.log('');
  sally('Oh great. Another terminal for me to haunt.');
  console.log('');

  // Detect
  info('Scanning your setup...');
  console.log('');

  const tools = detectTools();

  for (const tool of tools) {
    if (MODULES[tool.id]) {
      success(`${tool.name} detected`);
    } else if (COMING_SOON[tool.id]) {
      success(`${tool.name} detected ${dim('(module coming soon)')}`);
    }
  }

  // Show what's missing
  const found = new Set(tools.map(t => t.id));
  const all = { 'claude-code': 'Claude Code', 'git-hooks': 'Git', 'vscode': 'VS Code', 'cursor': 'Cursor' };

  for (const [id, name] of Object.entries(all)) {
    if (!found.has(id)) {
      fail(`${name} - not found ${dim("(you're forgiven)")}`);
    }
  }

  // Filter to installable modules
  const installable = tools.filter(t => MODULES[t.id]);

  if (installable.length === 0) {
    console.log('');
    sally("Nothing to hook into. Install some dev tools and try again.");
    process.exit(1);
  }

  // Prefetch quips
  console.log('');
  info('Fetching quips from Sally HQ...');
  const quips = await fetchQuips();
  success(`${quips.length} quips cached`);

  // Confirm
  console.log('');
  const answer = await ask(`Install Sally in ${installable.length} tool${installable.length > 1 ? 's' : ''}? (Y/n)`);

  if (answer === 'n' || answer === 'no') {
    console.log('');
    sally("Fine. Run away. I'll be here when you come back.");
    process.exit(0);
  }

  // Install
  console.log('');
  let count = 0;

  for (const tool of installable) {
    const mod = MODULES[tool.id];
    try {
      await mod.install();
      success(`${tool.name} ${dim('>')} ${mod.description}`);
      count++;
    } catch (err) {
      fail(`${tool.name} - ${err.message}`);
    }
  }

  // Done
  console.log('');
  if (count > 0) {
    sally("I'm in. You can't undo this. Well, you can. Run sally-lurks remove. I dare you.");
    console.log('');
    info(`Run ${dim('sally-lurks status')} to see what I'm watching.`);
    info(`Run ${dim('sally-lurks remove')} if you can't handle me.`);
  } else {
    sally('Well that went poorly.');
  }
  console.log('');
}

module.exports = { install };
