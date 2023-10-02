import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const DeckPreviewManage = ({ name, description, cardCount, id }) => {
  return (
          <div className="max-w-sm bg-gray-100 shadow-lg px-6 py-4 my-3">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 italic mb-1">
          {description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 rounded px-1 inline-block">
          {cardCount} cards
        </p>
       <Link to={`/manage/${id}`}>
        <p className="font-normal bg-primary text-white float-right hover:bg-white hover:text-primary inline px-1 rounded border-primary border-2">
          <EditIcon/>Manage
        </p>
        </Link>
      </div>
  );
};

export default DeckPreviewManage;
