import React, { useState } from "react";
import { ADD_DECK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import auth from "../../utils/auth";
import classCondition from "../../utils/classCondition";
import Unauthorized from "../UI/Unauthorized";

const CreateDeck = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [addDeck, { error }] = useMutation(ADD_DECK);
  const profile = auth.isLoggedIn() ? auth.getProfile() : null;
  
  if (!profile) {
    return (
      <Unauthorized/>
    )
  }

  const validInfo = () => {
    return name && description;
  };

  const createDeck = async (e) => {
    try {
      e.preventDefault();
      const response = await addDeck({
        variables: {
          name,
          description,
          userId: profile.data._id,
        },
      });
      if (response.data.addDeck._id) {
        window.location.assign(`/manage/${response.data.addDeck._id}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Create Deck</h1>
      <form onSubmit={createDeck}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="first-name"
          >
            Deck Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="first-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="last-name"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="last-name"
            type="text"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className={classCondition(
            !validInfo() ? "bg-red-200" : "bg-red-400 hover:bg-red-500",
            "text-white rounded shadow-md p-2"
          )}
          type="submit"
          disabled={!validInfo()}
        >
          Create Deck
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
