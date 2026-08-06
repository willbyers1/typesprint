# TypeSprint

TypeSprint is a web-based typing speed-test game wrapped in the atmosphere of an early-1980s American video arcade. It features live words-per-minute tracking, a pure TypeScript logic engine entirely decoupled from the view, and a hardware-accurate visual theme focusing on a dual-color Amber CRT aesthetic without relying on modern "synthwave" glow effects.

## Local Setup

Ensure you have Node.js installed, then run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Folder Structure

The project maintains a strict separation between rendering, game rules, and utility functions:

- `src/App.tsx` - Main application wrapper and state machine routing between screens.
- `src/engine/StatsEngine.ts` - A pure TypeScript class that handles all keystroke evaluation, WPM calculation, and accuracy tracking. This is fully decoupled from the DOM.
- `src/engine/words.ts` - The local content bank of arcade-themed phrases and retro words.
- `src/components/` - React components representing the four states of the arcade cabinet (`AttractScreen`, `ModeSelectScreen`, `GameScreen`, `ResultsScreen`) and the CRT effect wrapper.
- `src/utils/` - Helpers for `localStorage` (high scores) and the Web Audio API (chiptune blips).
- `src/types.ts` - Global TypeScript types and interfaces.
- `src/index.css` - Tailwind CSS configuration and pure CSS CRT styling (scanlines and vignette).
