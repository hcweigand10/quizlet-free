import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import Modal from "../UI/Modal";
import Listybox from "../UI/Listybox";
import auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { ArrowDownward } from "@mui/icons-material";
import { getIcon, avatars } from "../../utils/helpers";
import Loading from "../UI/Loading";

const SignUp = () => {
  const [signupObj, setSignUpObj] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const [addUser, { error }] = useMutation(ADD_USER);

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      if (signupObj.password !== signupObj.confirm) {
        setVisible(true);
        return;
      }
      setLoading(true)
      const mutationResponse = await addUser({
        variables: {
          username: signupObj.username,
          password: signupObj.password,
          icon: selectedAvatar,
        },
      });
      setLoading(false)
      const token = mutationResponse.data.addUser.token;
      auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    setSignUpObj({
      ...signupObj,
      [e.target.name]: e.target.value,
    });
  };
  const modalOptions = {
    visible,
    setVisible,
    title: "Oops",
  };

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={formSubmit}>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="username"
              value={signupObj.username}
              onChange={handleInputChange}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="password"
              value={signupObj.password}
              onChange={handleInputChange}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="confirm"
              value={signupObj.confirm}
              onChange={handleInputChange}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Pick your avatar
            </label>
            <div className="mb-4">
              <Listybox
                selected={selectedAvatar}
                setSelected={setSelectedAvatar}
                options={avatars}
              />
              <img
                src={getIcon(selectedAvatar)}
                alt={selectedAvatar}
                className="h-20 w-20 mx-auto mt-3"
              />
            </div>

            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Sign Up</span>
            </button>
          </form>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                MailUp
              </button>
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Google
              </button>
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Github
              </button>
            </div>
          </div>
        </div>
        <Link to="/login">Login instead</Link>
        <Modal options={modalOptions}>
          <p>Passwords don't match</p>
        </Modal>
      </div>
    </div>
  );
};

export default SignUp;
