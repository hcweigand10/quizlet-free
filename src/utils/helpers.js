export const secondsToTime = (time) => {
  const minutes = time % 60
  const seconds = time - (minutes*60)
  const result = `${minutes}:${seconds > 10 ? seconds : "0" + seconds.toString()}`
  return result
}

export const shuffleArray = (array) => {
  const result = [...array];
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export const checkAnswer = (guess, answer) => {
  const split = answer.split("(")
    const correct = split[0].trim().toLowerCase();
    const optional = split.length > 1 ? split[1].slice(0,-1).trim().toLowerCase() : null
    return (guess.toLowerCase() === correct || guess.toLowerCase() === optional) 
}