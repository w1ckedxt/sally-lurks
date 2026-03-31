const { install } = require('./install');
const { remove } = require('./remove');
const { status } = require('./status');
const { printQuip } = require('./quips');
const { banner, sally, dim } = require('./ui');

function run(args) {
  const command = args[0] || 'init';

  switch (command) {
    case 'init':
    case 'install':
      return install();
    case 'remove':
    case 'uninstall':
      return remove();
    case 'status':
      return status();
    case 'quip':
      return printQuip();
    case 'help':
    case '--help':
    case '-h':
      return showHelp();
    case '--version':
    case '-v':
      return showVersion();
    default:
      sally(`"${command}"? That's not a thing. Try --help.`);
      process.exit(1);
  }
}

function showHelp() {
  banner();
  console.log('');
  console.log('  Commands:');
  console.log('');
  console.log(`    ${dim('sally-lurks')}            Install Sally into your dev tools`);
  console.log(`    ${dim('sally-lurks status')}      See what she's watching`);
  console.log(`    ${dim('sally-lurks quip')}        Get a random quip`);
  console.log(`    ${dim('sally-lurks remove')}      Remove Sally (she'll judge you)`);
  console.log(`    ${dim('sally-lurks --help')}      You're looking at it`);
  console.log('');
  sally("You need help? That makes two of us.");
  console.log('');
}

function showVersion() {
  const pkg = require('../package.json');
  console.log(`sally-lurks v${pkg.version}`);
}

module.exports = { run };
