import React, { useState } from "react";
import Button from "./Button";
import ButtonGray from "./ButtonGray";

const EndLearn = ({ rounds, correct }) => {
  const deckId = window.location.pathname.split("/")[2];

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-3">Nicely Done!</h2>
        <h4 className="text-slate-600">Total Rounds</h4>
        <h3 className="text-slate-900 font-bold">{rounds}</h3>
        <h4 className="text-slate-600">Accuracy</h4>
        <h3 className="text-slate-900 font-bold">{Math.round(100 * (correct / rounds))}%</h3>
      </div>
      <ButtonGray onClick={() => window.location.reload()}>
        Play Again?
      </ButtonGray>
      <Button onClick={() => window.location.assign(`/test/${deckId}`)}>
        Take the test?
      </Button>
    </div>
  );
};

export default EndLearn;
