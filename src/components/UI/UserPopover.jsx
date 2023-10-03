import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { PROFILE } from "../../utils/queries";
import { Tooltip, Button } from "@material-tailwind/react";
import { Popover } from '@headlessui/react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Loading from "./Loading";

const UserPopover = ({ id }) => {
  const { loading, data } = useQuery(PROFILE, { variables: { userId: id } });
  const user = data?.profile.user;

  if (loading) return <Loading />;

  return (
    <Popover className="relative">
      <Popover.Button><p className="font-normal italic text-gray-500 dark:text-gray-400  hover:text-primary inline">
          <AccountCircleIcon className="mr-1"/>
          {user.username}
        </p></Popover.Button>

      <Popover.Panel className="absolute z-10">
      <div class="w-48">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <AccountCircleIcon />
            </div>
            <div class="p-2">
              <h3 class="text-center text-3xl text-gray-900 font-medium leading-8">
                {user.username}
              </h3>
              <div class="text-center text-gray-400 text-xs font-semibold">
                <p>{data.profile.decks.length} decks</p>
              </div>

              <div class="text-center my-3">
                <a
                  class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                  href={`/user/${id}`}
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
    // <Tooltip
    //   trigger={
    //     <p className="font-normal italic text-gray-700 dark:text-gray-400 float-right hover:text-primary inline">
    //       <AccountCircleIcon />
    //       {user.username}
    //     </p>
    //   }
    //   children={<p className="font-normal italic text-gray-700 dark:text-gray-400 float-right hover:text-primary inline">
    //   <AccountCircleIcon />
    //   {user.username}
    // </p>}
    //   content={
    //     // <p className="dark:text-white">
    //     //   This is a very beautiful tooltip, show some love.
    //     // </p>
    //     <div class="max-w-xs">
    //       <div class="bg-white shadow-xl rounded-lg py-3">
    //         <div class="photo-wrapper p-2">
    //           <AccountCircleIcon />
    //         </div>
    //         <div class="p-2">
    //           <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
    //             {user.username}
    //           </h3>
    //           <div class="text-center text-gray-400 text-xs font-semibold">
    //             <p>{data.profile.decks.length}</p>
    //           </div>

    //           <div class="text-center my-3">
    //             <a
    //               class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
    //               href={`/user/${id}`}
    //             >
    //               View Profile
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   }
    // />
  );
};

export default UserPopover;
