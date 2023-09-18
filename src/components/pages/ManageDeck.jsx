import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { DECK } from "../../utils/queries";
import { UPDATE_DECK, ADD_CARD, REMOVE_CARD } from "../../utils/mutations";
import Loading from "../UI/Loading";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ButtonGray from "../UI/ButtonGray";
import EditIcon from "@mui/icons-material/Edit";
import CardPreview from "../UI/CardPreview";
import ButtonDanger from "../UI/ButtonDanger";

const ManageDeck = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const deckId = window.location.pathname.split("/")[2];
  const { data, loading, refetch } = useQuery(DECK, {
    variables: {
      deckId,
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.deck.name)
      setDescription(data.deck.description)
    }
  }, [data])
  

  const [updateDeck, { error: updateError }] = useMutation(UPDATE_DECK);
  const [addCard, { error: addCardError }] = useMutation(ADD_CARD);
  const [removeCard, { error: removeCardError }] = useMutation(REMOVE_CARD);

  const modalOptions = {
    visible,
    setVisible,
    title: "Edit Details",
  };

  const updateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDeck({
        variables: {
          deckId,
          name,
          description,
        },
      });
      if (res.data.updateDeck) {
        refetch();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const addCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addCard({
        variables: {
          deckId,
          prompt,
          answer,
        },
      });
      if (res.data.addCard) {
        setVisible(false);
        setPrompt("")
        setAnswer("")
        refetch();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const removeCardSubmit = async (cardId) => {
    try {
      if (confirm("Are you sure you'd like to remove this card from the deck?")) {
        const res = await removeCard({ variables: { cardId, deckId } });
        if (res.data.removeCard) {
          refetch()
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const updateDisabled = loading
    ? false
    : name === data?.deck?.name && description === data?.deck?.description;
  const addCardDisabled = !answer || !prompt;

  if (loading) {
    return <Loading />;
  } 

  return (
    <div className="container mx-auto pb-5">
      <h1>Manage Deck</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 flex">
        {/* add/edit cards */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-3">Details</h2>
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
            <Button type="submit" disabled={updateDisabled}>
              Update
            </Button>
          </form>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-3">Cards</h2>
          <Button onClick={() => setVisible(true)}>Add Card</Button>
          {/* current cards */}
          <div className="mt-3 md:grid-cols-2 md:grid md:gap-4">
            {data.deck.cards.map((card) => {
              return (
                <CardPreview prompt={card.prompt} answer={card.answer} key={card._id}>
                  <ButtonDanger onClick={() => removeCardSubmit(card._id)}>
                    Remove
                  </ButtonDanger>
                </CardPreview>
              );
            })}
            {data.deck.cards.length == 0 ? <h2>No cards yet. Add some here!</h2> : null}
          </div>
        </div>
      </div>
      {/* edit details */}
      <Modal options={modalOptions}>
        {/* update deck form */}
        <form onSubmit={addCardSubmit}>
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Prompt
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Answer
          </label>
          <textarea
            type="text"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="answer"
            rows={2}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button type="submit" disabled={addCardDisabled}>
            Add
          </Button>
          <ButtonGray type="button" onClick={() => setVisible(false)}>
            Cancel
          </ButtonGray>
        </form>
      </Modal>
    </div>
  );
};

export default ManageDeck;
