export const ARCADE_PHRASES = [
  "DEFEND THE GALAXY FROM THE ALIEN SWARM.",
  "INSERT COIN TO CONTINUE.",
  "BEWARE OF THE ASTEROID FIELD AHEAD.",
  "SYSTEM FAILURE IMMINENT. EVACUATE NOW.",
  "PLAYER ONE GET READY.",
  "HIGH SCORE ACHIEVED. ENTER INITIALS.",
  "THE PRINCESS IS IN ANOTHER CASTLE.",
  "WARNING: APPROACHING BOSS STAGE.",
  "CRITICAL HIT. ENEMY DESTROYED.",
  "OUT OF AMMO. RELOAD REQUIRED.",
  "HYPERDRIVE ENGAGED. PREPARE FOR JUMP.",
  "SHIELDS AT TWENTY PERCENT.",
  "MISSION ACCOMPLISHED. RETURN TO BASE.",
  "GAME OVER. TRY AGAIN.",
  "A WINNER IS YOU.",
  "IT IS DANGEROUS TO GO ALONE.",
  "ALL YOUR BASE ARE BELONG TO US.",
  "WELCOME TO THE FANTASY ZONE.",
  "GET READY FOR THE NEXT BATTLE.",
  "CONGRATULATIONS. YOU HAVE SAVED THE WORLD."
];

export const RETRO_WORDS = [
  "ARCADE", "COIN", "PLAYER", "SCORE", "LEVEL", "STAGE", "BOSS", "LASER", "SHIELD",
  "GALAXY", "ALIEN", "ASTEROID", "ROCKET", "PIXEL", "SPRITE", "JOYSTICK", "BUTTON",
  "VECTOR", "RASTER", "CHIPTUNE", "SYNTH", "NEON", "CYBER", "PUNK", "NINJA",
  "FIGHTER", "STREET", "KOMBAT", "DRAGON", "QUEST", "FANTASY", "FINAL", "ZONE",
  "DANGER", "WARNING", "CRITICAL", "SYSTEM", "ERROR", "GLITCH", "HACK", "VIRUS",
  "MEMORY", "BYTE", "DATA", "TAPE", "DISK", "ROM", "RAM", "CPU", "BETA"
];

export function generateText(mode: 'TIME_ATTACK_60' | 'WORD_RUSH' | 'SURVIVAL'): string {
  // Combine phrases and words into a long string appropriate for typing
  let text = "";
  
  if (mode === 'WORD_RUSH') {
    // Generate exactly 50 words
    const words = [];
    for (let i = 0; i < 50; i++) {
      words.push(RETRO_WORDS[Math.floor(Math.random() * RETRO_WORDS.length)]);
    }
    return words.join(" ") + ".";
  }

  // For time attack and survival, generate a long mixed passage
  for (let i = 0; i < 20; i++) {
    text += ARCADE_PHRASES[Math.floor(Math.random() * ARCADE_PHRASES.length)] + " ";
    for (let j = 0; j < 3; j++) {
      text += RETRO_WORDS[Math.floor(Math.random() * RETRO_WORDS.length)] + " ";
    }
  }
  
  return text.trim();
}
