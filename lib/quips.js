const fs = require('fs');
const path = require('path');
const os = require('os');

const CACHE_DIR = path.join(os.homedir(), '.sally-lurks');
const CACHE_FILE = path.join(CACHE_DIR, 'quips.json');
const CACHE_MAX_AGE = 3600 * 1000; // 1 hour
const API_URL = 'https://cynicalsally.com/api/v1/quips?type=lurks';

const FALLBACK_QUIPS = [
  "She's watching.",
  "I lurk, therefore I am.",
  "Every keystroke is being judged.",
  "Don't mind me. I'm just here.",
  "You code. I watch. We have a system.",
  "I expected nothing and I'm still disappointed.",
  "Somewhere, a linter is crying.",
  "That variable name tells me nothing and you know it.",
];

async function fetchQuips() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Check cache freshness
  if (fs.existsSync(CACHE_FILE)) {
    const age = Date.now() - fs.statSync(CACHE_FILE).mtimeMs;
    if (age < CACHE_MAX_AGE) {
      try {
        const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
        if (cached.quips?.length > 0) return cached.quips;
      } catch {
        // Corrupted cache, refetch
      }
    }
  }

  // Fetch from Sally HQ
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (data.quips?.length > 0) {
      fs.writeFileSync(CACHE_FILE, JSON.stringify(data), 'utf8');
      return data.quips;
    }
  } catch {
    // API unreachable
  }

  return FALLBACK_QUIPS;
}

function randomQuip(quips) {
  return quips[Math.floor(Math.random() * quips.length)];
}

async function printQuip() {
  const { sally } = require('./ui');
  const quips = await fetchQuips();
  sally(randomQuip(quips));
}

module.exports = { fetchQuips, randomQuip, printQuip, CACHE_DIR, CACHE_FILE };
