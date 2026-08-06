<h1 align="center">🕹️ TypeSprint</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />
</p>

> Authentic 1983 arcade cabinet typing speed-test powered by a high-precision, decoupled TypeScript scoring engine.

---

## ⚡ Features

- 🕹️ **Authentic 1983 CRT Visuals**: Hand-crafted scanlines, subtle screen curvature, and phosphor amber/green monochrome palettes without modern neon clichés.
- ⏱️ **High-Precision StatsEngine**: Real-time WPM and accuracy calculation using `performance.now()` and `requestAnimationFrame` for sub-millisecond accuracy.
- 🎮 **Multiple Game Modes**: Experience Time Attack (60s/120s), Word Rush, and brutal Survival mode where three mistakes end your run.
- 🏆 **Classic High-Score Entry**: Enter your 3-letter initials using a rotary arcade selector and persist top scores directly in local storage.
- 🔊 **Web Audio Synthesizer**: Custom square-wave chiptune blips and high-score jingles built directly with the Web Audio API without heavy third-party assets.
- ⌨️ **Full Keyboard Control**: 100% accessible via keyboard from the initial Attract Screen demo loop to the final leaderboard entry.

---

## 🛠️ Tech Stack

- [TypeScript](https://www.typescriptlang.org/) - Typed logic with strict compiler enforcement.
- [Vite](https://vitejs.dev/) - Blazing fast frontend tooling and development server.
- [Tailwind CSS](https://tailwindcss.com/) - Low-level utility classes for custom CRT rendering.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Native browser audio synthesis for retro sound effects.
- [Vitest](https://vitest.dev/) - Unit testing framework for isolated StatsEngine verification.

---

## 🚀 Quick Start & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/typesprint.git
   cd typesprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run unit tests**
   ```bash
   npm run test
   ```

---

## ⚙️ Configuration & Environment

TypeSprint runs entirely client-side with zero external API key requirements. Scoring parameters can be adjusted directly in `src/core/StatsEngine.ts`:

```typescript
// Configurable logic for accuracy penalty calculations
export const STATS_CONFIG = {
  WORDS_PER_MINUTE_DIVISOR: 5,
  COUNT_CORRECTED_ERRORS_IN_ACCURACY: true,
  UPDATE_INTERVAL_MS: 250,
};
```

---

## 🕹️ How It Works

1. **Attract Mode**: Watch the idle screen loop and press any key to insert your coin.
2. **Mode Selection**: Use arrow keys to select between Time Attack, Word Rush, or Survival mode.
3. **Gameplay**: Type the retro-themed prompt sequence accurately. Correct keys turn phosphor bright; mistakes highlight errors in real-time.
4. **Results & Leaderboards**: View your WPM breakdown, correct rate, and log your 3-letter initials if you hit the local top score leaderboard.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Created By Mert Batu BULBUL**
* 🎓 AI Engineering & Full Stack Developer * 💻 React *

**Don't forget to star ⭐ this repo if you found it useful!**

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/username/typesprint/issues).
