import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { DECK } from "../../utils/queries";
import Modal from "../UI/Modal";
import Loading from "../UI/Loading";

const Learn = () => {
  const [unseen, setUnseen] = useState([]);
  const [levelOne, setLevelOne] = useState([]);
  const [levelTwo, setLevelTwo] = useState([]);
  const [levelThree, setLevelThree] = useState([]);
  const [current, setCurrent] = useState({});
  const [guess, setGuess] = useState("");
  const [fix, setFix] = useState("");
  const [status, setStatus] = useState("");
  const [visible, setVisible] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [correct, setCorrect] = useState(0);

  const deckId = window.location.pathname.split("/")[2];

  const { data, loading } = useQuery(DECK, { variables: { deckId } });

  useEffect(() => {
    if (data) {
      const shufffled = shuffleArray(data.deck.cards);
      setCurrent({ ...shufffled[0], level: "unseen" });
      setUnseen(shufffled.slice(1));
    }
  }, [data]);

  function shuffleArray(array) {
    const result = [...array];
    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  const check = (e) => {
    e.preventDefault();
    const correct = current.answer.split("(")[0].trim().toLowerCase();
    if (guess.toLowerCase() === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  };

  const correctAnswer = () => {
    setStatus("correct!");
    // if first time seeing, move to level 3
    if (current.level === "unseen") {
      setLevelThree([...levelThree, current]);
      // else move it up one level
    } else if (levelOne.includes(current)) {
      setLevelTwo([...levelTwo, current]);
    } else if (levelTwo.includes(current)) {
      setLevelThree([...levelThree, current]);
    }
    setCorrect(correct + 1);
    setRounds(rounds + 1);
    if (levelThree.length === data.deck.cards - 1) {
      endGame();
    } else {
      nextCard();
      setTimeout(() => {
        setStatus("");
      }, 2000);
    }
  };

  const wrongAnswer = () => {
    console.log(guess);
    //add to level one
    setLevelOne([...levelOne, current]);
    //remove from previous level
    setRounds(rounds + 1);
    setVisible(true);
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const nextCard = () => {
    setGuess("");
    if (levelThree.length === data.deck.cards) {
      return endGame();
    }
    // if still unseen cards, use those
    if (unseen.length > 0) {
      console.log("here")
      setCurrent({ ...unseen[0], level: "unseen" });
      setUnseen(unseen.slice(1));
    } else if (levelOne.length > 0 && levelTwo.length > 0) { // if both level one and two, coin flip to use one of them
      const flip = coinFlip();
      if (flip) {
        setCurrent({ ...levelOne[0], level: "levelOne" });
        setLevelOne(levelOne.slice(1));
      } else {
        setCurrent({ ...levelTwo[0], level: "levelTwo" });
        setLevelTwo(levelTwo.slice(1));
      }
    } else { // if only one remaining, use that
      if (levelOne.length === 0) {
        setCurrent({ ...levelTwo[0], level: "levelTwo" });
        setLevelTwo(levelTwo.slice(1));
      } else {
        setCurrent({ ...levelOne[0], level: "levelOne" });
        setLevelOne(levelOne.slice(1));
      }
    }
  };

  const checkFix = (e) => {
    e.preventDefault()
    const correct = current.answer.split("(")[0].trim().toLowerCase();
    if (fix === correct) {
      
    }
  }

  const endGame = () => {};

  const coinFlip = () => Math.random() > 0.5;

  const modalOptions = {
    visible,
    setVisible,
    title: "Incorrect",
    onClose: nextCard,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container ">
      <h1>Learn</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
        <div className="col-span-1 bg-white rounded p-5">
          <h4>Unseen: {unseen.length}</h4>
          <h4>Still learning: {levelOne.length}</h4>
          <h4>Almost: {levelTwo.length}</h4>
          <h4>Locked down: {levelThree.length}</h4>
        </div>
        <div className="col-span-1 md:col-span-3 bg-white rounded p-5">
          <h4 className="text-slate-600">Prompt</h4>
          <h2 className="text-3xl">{current.prompt}</h2>
          <form className="mt-5" onSubmit={check}>
            <label className="text-sm text-slate-600 pb-1 block">
              Answer here
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-80"
              name="guess"
              value={guess}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className="col-span-1 bg-white rounded p-5">
          <h4>Round: {rounds + 1}</h4>
          <h4>Percentage: {rounds ? (100 * correct) / rounds : "-"}%</h4>
        </div>
      </div>
      <h3 className="text-green-800 text-center text-2xl">{status}</h3>
      <Modal options={modalOptions}>
        <h2>
          Your answer: <span className="text-red-600 italic">{guess}</span>
        </h2>
        <h2>
          Correct answer:{" "}
          <span className="text-slate-600 italic">{current.answer}</span>
        </h2>
        <form onSubmit={checkFix}>
        <label className="text-sm text-slate-600 pb-1 block">
              Answer here
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-80"
              name="fix"
              value={fix}
              onChange={handleInputChange}
            />
        </form>
      </Modal>
    </div>
  );
};

export default Learn;
