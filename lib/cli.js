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
  console.log(`    ${dim('sally-lurks')}            Let me into your dev tools`);
  console.log(`    ${dim('sally-lurks status')}      See what I'm watching`);
  console.log(`    ${dim('sally-lurks quip')}        Hear what I think`);
  console.log(`    ${dim('sally-lurks remove')}      Try to get rid of me`);
  console.log(`    ${dim('sally-lurks --help')}      You're looking at it`);
  console.log('');
  sally("You need --help? That makes two of us.");
  console.log('');
}

function showVersion() {
  const pkg = require('../package.json');
  console.log(`sally-lurks v${pkg.version}`);
}

module.exports = { run };
