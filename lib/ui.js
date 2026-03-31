const readline = require('readline');

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function banner() {
  console.log('');
  console.log(`  ${c.magenta}+---------------------------------------+${c.reset}`);
  console.log(`  ${c.magenta}|${c.reset}  ${c.bold}sally-lurks${c.reset}                          ${c.magenta}|${c.reset}`);
  console.log(`  ${c.magenta}|${c.reset}  ${c.dim}She's in your terminal now.${c.reset}          ${c.magenta}|${c.reset}`);
  console.log(`  ${c.magenta}+---------------------------------------+${c.reset}`);
}

function sally(msg) {
  console.log(`  ${c.magenta}sally:${c.reset} ${msg}`);
}

function success(msg) {
  console.log(`  ${c.green}+${c.reset} ${msg}`);
}

function fail(msg) {
  console.log(`  ${c.red}x${c.reset} ${msg}`);
}

function info(msg) {
  console.log(`  ${c.cyan}>${c.reset} ${msg}`);
}

function warn(msg) {
  console.log(`  ${c.yellow}!${c.reset} ${msg}`);
}

function dim(text) {
  return `${c.dim}${text}${c.reset}`;
}

function bold(text) {
  return `${c.bold}${text}${c.reset}`;
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`  ${c.cyan}?${c.reset} ${question} `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

module.exports = { banner, sally, success, fail, info, warn, dim, bold, ask, c };
