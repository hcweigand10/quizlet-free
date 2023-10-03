import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DECK } from "../../utils/queries";
import Loading from "../UI/Loading";
import Button from "../UI/Button";
import CardPreview from "../UI/CardPreview";
import { ADD_SCORE } from "../../utils/mutations";
import auth from "../../utils/auth";
import classCondition from "../../utils/classCondition";
import UserPopover from "../UI/UserPopover";
import { Link } from "react-router-dom";
import Scoreboard from "../UI/Scoreboard";

const View = () => {
  const deckId = window.location.pathname.split("/")[2];
  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });

  const username = auth.isLoggedIn() ? auth.getProfile().data.username : null;

  const deck = data?.deck;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 mb-3">
        <div className="col-span-1">
          <div className="mb-7">
            <h4 className="text-slate-500 mb-5">
              <a className="underline text-slate-700" href="/decks">
                All Decks
              </a>{" "}
              | <span className="italic">{deck.name}</span>
            </h4>
            <h1 className="">{deck.name}</h1>
            <h3 className="text-md text-slate-500">{deck.description}</h3>
          </div>
          <div className="my-5">
            <a
              className={classCondition(
                username ? "hover:bg-purple-500" : "disabled-link opacity-60",
                "w-24 bg-purple-400 text-white rounded py-2 px-3 mr-4 font-bold text-lg"
              )}
              href={`/learn/${deckId}`}
            >
              Learn
            </a>
            <a
              className={classCondition(
                username ? "hover:bg-rose-500" : "disabled-link opacity-60",
                "w-24 bg-rose-400 text-white rounded py-2 px-3 mr-4 font-bold text-lg"
              )}
              href={`/test/${deckId}`}
            >
              Test
            </a>
            <p className="mt-2 text-slate-500">
              {username ? null : "(login to learn or test!)"}
            </p>
          </div>
        </div>
        <div className="mb-4 col-span-1 flex sm:justify-end items-center">
          <h4 className="">
            Created By <UserPopover id={deck.createdBy._id} />
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
        <div className="col-span-1 mb-6">
          <Scoreboard deck={deck} />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl mb-2">Cards</h2>
          {deck.cards.map((card, index) => {
            return (
              <div className="bg-white p-2 my-1 rounded" key={index}>
                <h2 className="italic text-slate-500 text-md">{card.prompt}</h2>
                <h3 className="text-xl">{card.answer}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default View;
