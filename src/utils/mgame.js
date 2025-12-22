const GAME_STATE = {
  IDLE: "Idle",
  SHOWING: "Showing",
  PLAYER: "Player",
  WON: "Won",
  OVER: "Over",
};

const gridSize = 25;

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const playSound = (sound) => {
  const audio = new Audio(`/audio/${sound}.wav`);
  audio.currentTime = 0;
  audio.play();
}

export {
  GAME_STATE,
  gridSize,
  randomInt,
  playSound
};