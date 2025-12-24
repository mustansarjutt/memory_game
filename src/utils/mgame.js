const GAME_STATE = {
  IDLE: "Idle",
  SHOWING: "Showing",
  PLAYER: "Player",
  WON: "Won",
  OVER: "Over",
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const playSound = (sound) => {
  const audio = new Audio(`/audio/${sound}.wav`);
  audio.currentTime = 0;
  audio.play();
};

const DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard"
};

const DIFFICULTY_SETTINGS = {
  Easy: { min: 3, max: 5 },
  Medium: { min: 5, max: 7 },
  Hard: { min: 8, max: 10 }
};

export {
  GAME_STATE,
  randomInt,
  playSound,
  DIFFICULTY,
  DIFFICULTY_SETTINGS
};