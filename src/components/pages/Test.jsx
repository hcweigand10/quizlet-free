import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DECK } from "../../utils/queries";
import { ADD_SCORE } from "../../utils/mutations";
import Loading from "../UI/Loading";
import { checkAnswer, secondsToTime, shuffleArray } from "../../utils/helpers";
import Button from "../UI/Button";
import { AutoAwesome } from "@mui/icons-material";
import auth from "../../utils/auth";
import Scoreboard from "../UI/Scoreboard";

const Test = () => {
  const [pregame, setPregame] = useState(true);
  const [ingame, setIngame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cardsLeft, setCardsLeft] = useState([]);
  const [guess, setGuess] = useState("");
  const [current, setCurrent] = useState({ prompt: "", answer: "" });

  const deckId = window.location.pathname.split("/")[2];
  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });
  const deck = data?.deck;

  const [addScore, error] = useMutation(ADD_SCORE);

  useEffect(() => {
    if (ingame) {
      const stopwatch = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      // Clean up the interval when the component unmounts or when ingame changes.
      return () => clearInterval(stopwatch);
    }
  }, [ingame]);

  useEffect(() => {
    console.log(cardsLeft);
    nextCard();
  }, [cardsLeft]);

  useEffect(() => {
    if (data) {
      setCardsLeft(
        shuffleArray(
          deck.cards.map((card) => {
            const { prompt, answer } = card;
            return { prompt, answer };
          })
        )
      );
    }
  }, [data]);

  const start = () => {
    setPregame(false);
    setIngame(true);
  };

  const check = (e) => {
    e.preventDefault();
    if (checkAnswer(guess, current.answer)) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
    setGuess("");
  };

  const correctAnswer = () => {
    if (cardsLeft.length === 1) finish();
    setCorrect(correct + 1);
    setCardsLeft(cardsLeft.filter((card) => card.prompt !== current.prompt));
  };

  const wrongAnswer = () => {
    setTime(time + 5);
    setCardsLeft([...cardsLeft.slice(1), current]);
  };

  const nextCard = () => {
    setCurrent(cardsLeft[0]);
  };

  const finish = async () => {
    setGameOver(true);
    setIngame(false);
    const res = await addScore({
      variables: {
        deckId,
        score: time,
        type: "test",
        userId: auth.getProfile().data._id,
      },
    });
    refetch();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container max-w-6xl">
      <div className="mb-7">
        <h4 className="text-slate-500 mb-5">
          <a className="underline text-slate-700" href="/decks">
            All Decks
          </a>{" "}
          |{" "}
          <a className="underline text-slate-700" href={`/view/${deckId}`}>
            {deck.name}
          </a>{" "}
          | <span className="italic">Test</span>
        </h4>
        <h1 className="">{deck.name}</h1>
      </div>
      <div className="bg-white p-6 rounded relative">
        <div className="absolute top-5 right-5">
          <h2 className="text-slate-600 text-right">
            Time: <span className="font-bold">{secondsToTime(time)}</span>
          </h2>
          <h2 className="text-slate-600 text-right">
            Correct:{" "}
            <span className="font-bold">
              {correct} / {deck.cards.length}
            </span>
          </h2>
        </div>
        {pregame ? (
          <div>
            <h2 className="text-2xl mb-4">Test Rules</h2>
            <ol className="text-slate-600 mb-5">
              <li className="mb-2">
                <AutoAwesome /> Score is based on time
              </li>
              <li className="mb-2">
                <AutoAwesome /> Incorrect answers add 5 seconds to your time and
                the card will have to be attempted again
              </li>
              <li className="mb-2">
                <AutoAwesome /> Casing does not matter
              </li>
              <li className="mb-2">
                <AutoAwesome /> But spelling does
              </li>
              <li className="mb-2">
                <AutoAwesome /> Some prompts have two acceptable answers (second
                answer will be inside parentheses, like this!)
              </li>
            </ol>
            <Button onClick={start}>Start Test</Button>
          </div>
        ) : (
          <>
            {gameOver ? (
              <>
                <h2>Nice Job!</h2>
                <h4>Your time: {time}</h4>
                <Scoreboard deck={deck} />
              </>
            ) : (
              <div>
                <form onSubmit={check}>
                  <h4 className="text-slate-600">Prompt</h4>
                  <h2 className="text-3xl">{current.prompt}</h2>
                  <label className="text-sm text-slate-600 pb-1 block">
                    Answer here
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-80"
                    name="guess"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                  />
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
