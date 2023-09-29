import butterfly from "../assets/animals/butterfly.png"
import chameleon from "../assets/animals/chameleon.png"
import crab from "../assets/animals/crab.png"
import dolphin from "../assets/animals/dolphin.png"
import elephant from "../assets/animals/elephant.png"
import jellyfish from "../assets/animals/jellyfish.png"
import koala from "../assets/animals/koala.png"
import turtle from "../assets/animals/turtle.png"
import whale from "../assets/animals/whale.png"

export const secondsToTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const result = `${minutes}:${
    seconds > 10 ? seconds : "0" + seconds.toString()
  }`;
  return result;
};

export const shuffleArray = (array) => {
  const result = [...array];
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

export const checkAnswer = (guess, answer) => {
  const split = answer.split("(");
  const correct = split[0].replaceAll("'", "").replaceAll(".", "").trim().toLowerCase();
  const optional =
    split.length > 1
      ? split[1].slice(0, -1).replaceAll("'", "").replaceAll(".", "").trim().toLowerCase()
      : null;
  return guess.toLowerCase() === correct || guess.toLowerCase() === optional;
};

export const getIcon = (user) => {
  switch (user.icon) {
    case "crab": 
      return crab
    case "butterfly": 
      return butterfly
    case "chameleon":
      return chameleon
    case "dolphin":
      return dolphin
    case "elephant":
      return elephant
    case "jellyfish":
      return jellyfish
    case "koala":
      return koala
    case "turtle":
      return turtle
    case "whale":
      return whale
  }
}
