import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROFILE } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
import Loading from "../UI/Loading";
import Button from "../UI/Button";
import auth from "../../utils/auth";
// import { FaBeer, FaCocktail, FaAnchor } from 'react-icons/fa'
import { getIcon, avatars } from "../../utils/helpers";
import ProfileTabs from "../UI/ProfileTabs";
import Listybox from "../UI/Listybox";
import ButtonGray from "../UI/ButtonGray";
import Unauthorized from "../UI/Unauthorized";

const Profile = () => {
  const [updating, setUpdating] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");

  const { username, _id } = auth.isLoggedIn()
    ? auth.getProfile().data
    : { username: null, _id: null };

  const { data, loading: profileLoading, refetch } = useQuery(PROFILE, {
    variables: {
      userId: _id,
    },
    onCompleted: () => {
      // console.log(data)
      resetUpdate();
    },
  });

  const [updateUser, {error: updateError, loading}] = useMutation(UPDATE_USER);

  const resetUpdate = () => {
    setUpdating(false);
    setUsernameInput(data.profile.user.username);
    setSelectedAvatar(data.profile.user.icon);
  };

  const updateProfile = async () => {
    try {
      const variables = {
        userId: _id,
        username: usernameInput,
        icon: selectedAvatar,
      };
      const response = await updateUser({
        variables: variables,
      });
      if (response.data.updateUser) {
        localStorage.setItem('token', response.data.updateUser.token);
        refetch()
        setUpdating(false)
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // You can choose to handle errors as needed
    }
  };


  if (profileLoading || loading) {
    return <Loading />;
  }

  if (!username) {
    return (
      <Unauthorized />
    );
  }

  return (
    <div className="container max-w-6xl">
      <div className="flex mb-2">
        <div className="w-32 pt-3">
          {updating ? (
            <div>
              <img
                src={getIcon(selectedAvatar)}
                alt={selectedAvatar}
                className="w-16 h-16 mx-auto"
              />
              <Listybox
                selected={selectedAvatar}
                setSelected={setSelectedAvatar}
                options={avatars}
              />
            </div>
          ) : (
            <div className="flex items-center h-full">
            <img
              className="w-24 h-auto mx-auto"
              src={getIcon(data.profile.user.icon)}
              alt={data.profile.user.icon}
              />
              </div>
          )}
        </div>
        <div className="ml-5">
          {updating ? (
            <>
              <input
                type="text"
                className="w-full"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
              <br />
              <div className="mt-5">
                <Button
                  onClick={updateProfile}
                  disabled={
                    selectedAvatar === data.profile.user.icon &&
                    usernameInput === data.profile.user.username
                  }
                >
                  Save
                </Button>
                <ButtonGray onClick={resetUpdate}>Cancel</ButtonGray>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-slate-500">{data.profile.user.username}</h1>
              <Button onClick={() => setUpdating(true)}>Edit Profile</Button>
            </>
          )}
        </div>
      </div>
      <ProfileTabs
        decks={data.profile.decks}
        scoreReports={data.profile.scoreReports}
        username={data.profile.user.username}
      />
    </div>
  );
};

export default Profile;
