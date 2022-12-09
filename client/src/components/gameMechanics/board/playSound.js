import move from "../../../assets/sounds/move.mp3";
import capture from "../../../assets/sounds/capture.mp3";

export const playSound = (sound) => {
  const moveSound = new Audio(move);
  const captureSound = new Audio(capture);

  if (sound === "move") return moveSound.play();
  if (sound === "capture") return captureSound.play();
};
