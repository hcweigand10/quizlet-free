import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

const DeckPreview = ({ name, description, user, cardCount, id }) => {
  return (
    <Link to={`/learn/${id}`}>
          <div className="max-w-sm bg-white hover:bg-slate-50 shadow-lg px-6 py-4 my-3">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 italic mb-1">
          {description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 bg-primary text-white rounded px-1 inline-block">
          {cardCount} cards
        </p>
        <Link to={`/profile/${user._id}`}>
        <p className="font-normal italic text-gray-700 dark:text-gray-400 float-right hover:text-primary inline">
          <AccountCircleIcon/>{user.username}
        </p>
        </Link>
      </div>
    </Link>
  );
};

export default DeckPreview;
