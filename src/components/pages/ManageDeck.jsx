import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { DECK } from "../../utils/queries";
import { UPDATE_DECK, ADD_CARD } from "../../utils/mutations";
import Loading from "../UI/Loading";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const deckId = window.location.pathname.split("/")[2];

const ManageDeck = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")

  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });
  const [updateDeck, { error: updateError }] = useMutation(UPDATE_DECK);
  const [addCard, { error: addCardError }] = useMutation(ADD_CARD);
  const modalOptions = {
    visible,
    setVisible,
    title: "Edit Details",
  };

  const updateFormSubmit = async (e) => {
    e.preventDefault();
    const res = await updateDeck({
      variables: {
        deckId,
        name,
        description,
      },
    });
  };

  const updateDisabled = name === data.deck.name && description === data.deck.description
  const addCardDisabled = !answer && !prompt

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h3>Manage Deck</h3>
      <h2>{data.deck.name}</h2>
      <h4>{data.deck.description}</h4>
      <Button
        onClick={() => {
          setName(data.deck.name);
          setDescription(data.deck.description);
          setVisible(true);
        }}
        type={"button"}
      >
        Edit Name/Description
      </Button>
      <Modal options={modalOptions}>
        {/* update deck form */}
        <form onSubmit={updateFormSubmit}>
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Name
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Description
          </label>
          <textarea
            type="text"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" disabled={updateDisabled}>Update</Button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageDeck;
