# Dev Server Reset Guide

## Problem

When the Next.js dev server hangs at "Starting..." or spawns multiple ports (3000, 3001, 3002), it usually indicates:

- A blocking import, infinite loop, or unhandled promise during boot
- A dev-server process not shutting down cleanly
- A circular dependency triggered during compilation

## Solution: Hard Reset

Use the `dev-reset.ps1` script to completely clean the environment:

```powershell
npm run dev:reset
```

Or run directly:

```powershell
powershell -File scripts/dev-reset.ps1
```

## What the Script Does

1. **Kills all Node.js processes** - Ensures no lingering dev servers
2. **Frees ports 3000-3010** - Clears any port conflicts
3. **Waits for cleanup** - Gives processes time to fully terminate

## When to Use

- Dev server hangs at "Starting..."
- Multiple ports are spawned (3000, 3001, 3002)
- Stopping terminals doesn't fully stop servers
- Port 3000 is already in use
- After making changes that might cause blocking imports

## After Reset

1. Run the reset script
2. Wait for confirmation that ports are free
3. Start dev server: `npm run dev`
4. If it still hangs, proceed to Phase 2 (boot isolation) to identify the blocking file

## Next Steps

If reset doesn't solve the issue, see the boot isolation steps in the main debugging guide to identify which file is preventing startup.

