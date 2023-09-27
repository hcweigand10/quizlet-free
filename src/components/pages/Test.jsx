import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DECK } from "../../utils/queries";
import { ADD_SCORE } from "../../utils/mutations";
import Loading from "../UI/Loading";
import { secondsToTime } from "../../utils/helpers";
import Button from "../UI/Button";
import { AutoAwesome } from "@mui/icons-material";

const Test = () => {
  const [pregame, setPregame] = useState(true);
  const [time, setTime] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cardsLeft, setCardsLeft] = useState([]);

  const deckId = window.location.pathname.split("/")[2];
  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });
  const deck = data?.deck;

  if (loading) {
    return <Loading />;
  }

  const start = () => {
    setPregame(false)
  };

  const check = () => {};

  const correctAnswer = () => {};

  const wrongAnswer = () => {};

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
      ) : <div>
        testing!
        </div>}
      </div>
    </div>
  );
};

export default Test;
