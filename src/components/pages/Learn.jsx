import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { DECK } from "../../utils/queries";

const Learn = () => {
  const [unseen, setUnseen] = useState([]);
  const [levelOne, setLevelOne] = useState([]);
  const [levelTwo, setLevelTwo] = useState([]);
  const [levelThree, setLevelThree] = useState([]);
  const [current, setCurrent] = useState({});

  const deckId = window.location.pathname.split("/")[2];

  const { data, loading } = useQuery(DECK, { variables: { deckId } });

  useEffect(() => {
    if (data) {
      const shufffled = shuffleArray(data.deck.cards);
      setUnseen(shufffled.slice(1));
      setCurrent(shufffled[0]);
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

  return (
    <div className="container grid gird-cols-1 md:grid-cols-4">
      <h1>Learn</h1>
      <div className="col-span-1">
        <h4>Unseen: {unseen.length}</h4>
        <h4>Still learning: {levelOne.length}</h4>
        <h4>Almost: {levelTwo.length}</h4>
        <h4>Locked down: {levelThree.length}</h4>
      </div>
      <div className="col-span-1 md:col-span-3">
        <h2>Propmt: {current.prompt}</h2>
      </div>
    </div>
  );
};

export default Learn;
