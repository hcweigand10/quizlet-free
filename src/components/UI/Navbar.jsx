import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import icon from "../../assets/icon.png";
import auth from "../../utils/auth";
import classCondition from "../../utils/classCondition";
import {basePages, authPages} from "../../utils/pages"
import { Transition } from "@headlessui/react";
 

const NavbarComp = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const pages = auth.isLoggedIn() ? basePages.concat(authPages) : basePages
  

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src={icon} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Quiz Quo Pro
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {auth.isLoggedIn() ? (
          <>
          <h2 className="my-auto hidden sm:block">Welcome, <span className="italic font-semibold">{auth.getProfile().data.username}</span></h2>
          <button
            className="mx-2 bg-slate-100 text-red-500 px-3 py-2 rounded hover:bg-slate-200"
            onClick={auth.logout}
            >
            Logout
          </button>
            </>
        ) : (
          <a
            className="mr-2 bg-primary text-white rounded px-3 py-2 font-semibold"
            href="/login"
          >
            Login
          </a>
        )}
        <Navbar.Toggle />
      </div>


      <Navbar.Collapse className="absolute top-12 left-0 z-10 bg-white sm:static">
        {pages.map((page,index) => (
          <a
          className={classCondition(
            currentPage === page.path ? "text-primary" : "text-slate-700 ",
            "py-2 pr-4 pl-3 md:p-0 text-md border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white hover:text-primary"
            )}
            key={index}
            href={page.path}
            // onClick={() => setCurrentPage(page.path)}
            >
          {page.name}
          </a>
        ))}
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
