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

const View = () => {
  const deckId = window.location.pathname.split("/")[2];
  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });
  const userId = auth.getProfile().data._id;

  const [addScore, { error }] = useMutation(ADD_SCORE);
  const deck = data?.deck;
  console.log(data);

  if (loading) {
    return <Loading />;
  }

  const scores = [...deck?.scores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((score, index) => {
      return (
        <li
          className={classCondition(
            index % 2 === 1 ? "bg-slate-50" : "",
            "px-6 py-4"
          )}
          key={index}
        >
          <div className="flex items-center">
            <span className="font-bold text-gray-900">{index + 1}</span>
            <div className="ml-3">
              <p className="text-gray-900 text-lg italic">{score.user.username}</p>
              <p className="text-gray-500">Time: {score.score}</p>
            </div>
          </div>
        </li>
      );
    });

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
            <h2 className="text-3xl">{deck.name}</h2>
            <h3 className="text-md text-slate-500">{deck.description}</h3>
          </div>
          <div className="my-5">
            <Link
              className="w-24 bg-purple-400 text-white rounded py-2 px-3 mr-4 font-bold text-lg hover:bg-purple-500"
              to={`/learn/${deckId}`}
            >
              Learn
            </Link>
            <Link
              className="w-24 bg-rose-400 text-white rounded py-2 px-3 font-bold text-lg hover:bg-rose-500"
              to={`/test/${deckId}`}
            >
              Test
            </Link>
          </div>
        </div>
        <div className="mb-4 col-span-1 flex justify-end items-center">
          <h4 className="">
            Created By <UserPopover id={deck.createdBy._id} />
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
        <div className="col-span-1">
          <h2 className="text-xl mb-2">Cards</h2>
          {deck.cards.map((card, index) => {
            return (
              <div className="bg-white p-2 my-1 rounded" key={index}>
                <h2 className="italic text-slate-500 text-md">{card.prompt}</h2>
                <h3 className="text-xl">
                  {card.answer}
                </h3>
              </div>
            );
          })}
        </div>
        <div className="col-span-1">
          <h2 className="text-xl mb-2">Highscores</h2>
          <div className="">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-t border-gray-200">
                <ol className="divide-y divide-gray-200">{scores}</ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
