import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import UserPopover from "./UserPopover";

const DeckPreview = ({ name, description, user, cardCount, id }) => {
  return (
    <a href={`/view/${id}`} className="max-w-lg block">
      <div className="max-w-lg bg-white shadow-md hover:shadow-xl px-6 py-4 my-3 rounded">
        <h5 className="text-2xl font-semibold text-slate-700 dark:text-white mb-2">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 bg-primary text-white rounded px-1 inline-block">
          {cardCount} cards
        </p>
        <div className="float-right">
          <UserPopover id={user._id} />
        </div>
      </div>
    </a>
  );
};

export default DeckPreview;
