import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import Loading from "../UI/Loading";
import { useQuery } from "@apollo/client";
import { ALL_DECKS } from "../../utils/queries";
import DeckPreview from "../UI/DeckPreview";

const Play = () => {
  const { loading, data } = useQuery(ALL_DECKS);
  console.log(data);
  return (

    <div className="container">
      <h3 className="">All Decks</h3>
      {loading ? (
        <Loading />
        ) : (
          <div className="">
          {data.allDecks.map((deck) => {
            return (
              <DeckPreview
              name={deck.name}
              user={deck.createdBy}
              description={deck.description}
              cardCount={deck.cardCount}
              id={deck._id}
              key={deck._id}
              />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Play;
