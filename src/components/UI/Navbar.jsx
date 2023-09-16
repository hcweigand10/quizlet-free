import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import icon from "../../assets/icon.png";
import auth from "../../utils/auth";
import classCondition from "../../utils/classCondition";

const styles = {
  link: "hover:text-primary px-2 py-1 rounded"
}

const NavbarComp = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
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
          <button className="mr-2 bg-white text-red-500 px-3 py-2 rounded hover:bg-slate-100" onClick={auth.logout}>
            Logout
          </button>
        ) : (
          <Link
            className="mr-2 bg-primary text-white rounded px-3 py-2 font-semibold"
            to="/login"
          >
            Login
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          className={classCondition(
            currentPage === "/" ? "text-primary" : "",
            styles.link
          )}
          to="/"
          onClick={() => setCurrentPage("/")}
        >
          Home
        </Link>
        <Link
          className={classCondition(
            currentPage === "/play" ? "text-primary" : "",
            styles.link
          )}
          to="/play"
          onClick={() => setCurrentPage("/play")}
        >
          Play
        </Link>
        {auth.isLoggedIn() ? (
          <>
            <Link
              className={classCondition(
                currentPage === "/profile" ? "text-primary" : "",
                styles.link
              )}
              to="/profile"
              onClick={() => setCurrentPage("/profile")}
            >
              Profile
            </Link>
            <Link
              className={classCondition(
                currentPage === "/create" ? "text-primary" : "",
                styles.link
              )}
              to="/create"
              onClick={() => setCurrentPage("/create")}
            >
              Create a Deck
            </Link>
          </>
        ) : null}
        <Link
          className={classCondition(
            currentPage === "/about" ? "text-primary" : "",
            styles.link
          )}
          to="/about"
          onClick={() => setCurrentPage("/about")}
        >
          About
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
