<p align="center">
  <img src="assets/banner.png" alt="Sally lurking in the bushes while everything is on fire" width="100%" />
</p>

# sally-lurks

She's in your terminal. She's in your commits. She sees that `any` type.

**Sally Lurks** installs [Cynical Sally](https://cynicalsally.com) into your developer tools. Status lines, git hooks, and ambient judgment -- all in one command.

```
npx @cynicalsally/lurks
```

```
  +---------------------------------------+
  |  sally-lurks                          |
  |  She's in your terminal now.          |
  +---------------------------------------+

  sally: Oh great. Another terminal to haunt.

  > Scanning your setup...

  + Claude Code detected
  + Git detected
  + VS Code detected (module coming soon)
  x Cursor - not found (you're forgiven)

  > Fetching quips from Sally HQ...
  + 36 quips cached

  ? Install Sally in 2 tools? (Y/n) y

  + Claude Code > status line with Sally quips
  + Git > post-commit quips

  sally: She's in. You can't undo this.
```

## What it does

| Module | Tool | What happens |
|--------|------|-------------|
| **Status line** | Claude Code | Sally quips rotate in your terminal status bar |
| **Post-commit** | Git | Sally comments on every commit with diff stats |
| **Status bar** | VS Code / Cursor | *Coming soon* |
| **PR comments** | GitHub Actions | *Coming soon* |

## Commands

```bash
npx @cynicalsally/lurks            # Install Sally into detected tools
sally-lurks status         # See what she's watching
sally-lurks quip           # Get a random quip
sally-lurks remove         # Remove Sally (she'll judge you)
```

## How it works

Sally Lurks fetches personality from the [Cynical Sally](https://cynicalsally.com) API and caches it locally. No API key needed. No account required. She just shows up.

Your quips refresh every hour. Everything runs locally after the initial fetch. Zero dependencies. Node 18+.

## Uninstall

```bash
sally-lurks remove
```

```
  sally: Really? After everything we've been through?
  ? Remove Sally from your tools? (y/N) y

  + Removed from Claude Code
  + Removed from Git
  + Cache cleared

  sally: She's gone. Your terminal feels emptier already.
```

## Want more Sally?

Sally Lurks is free. If you want full code reviews, roasts, and deep analysis:

- **[Sally CLI](https://cynicalsally.com)** -- full reviews from your terminal
- **[CynicalSally.com](https://cynicalsally.com)** -- roast websites, docs and images
- **[Sally Lite](https://www.render.com/?utm_source=sally_lurks&utm_medium=referral&utm_campaign=cynical_sally)** -- deploy Sally to your Render stack in seconds

## License

MIT
