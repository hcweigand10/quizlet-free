import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import UserPopover from "./UserPopover";

const DeckPreview = ({ name, description, user, cardCount, id }) => {
  return (
    <a href={`/view/${id}`} className="max-w-sm block">
          <div className="max-w-sm bg-white hover:bg-slate-50 shadow-lg px-6 py-4 my-3 rounded">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 italic mb-1">
          {description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 bg-primary text-white rounded px-1 inline-block">
          {cardCount} cards
        </p>
        <div className="float-right">

        <UserPopover id={user._id}/>
        </div>
      </div>
    </a>
  );
};

export default DeckPreview;
