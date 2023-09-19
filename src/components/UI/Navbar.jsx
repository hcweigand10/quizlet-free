import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import icon from "../../assets/icon.png";
import auth from "../../utils/auth";
import classCondition from "../../utils/classCondition";
import {basePages, authPages} from "../../utils/pages"

const styles = {
  link: "hover:text-primary px-2 py-1 rounded",
};
 

const NavbarComp = ({ username }) => {
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
          <button
            className="mr-2 bg-white text-red-500 px-3 py-2 rounded hover:bg-slate-100"
            onClick={auth.logout}
          >
            Logout
          </button>
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
      <Navbar.Collapse>
        {pages.map((page,index) => (
          <a
          className={classCondition(
            currentPage === page.path ? "text-primary" : "",
            "py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white hover:text-primary"
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
