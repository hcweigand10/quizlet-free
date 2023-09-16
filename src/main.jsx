import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Decks from "./components/pages/Decks.jsx";
import Game from "./components/pages/Game.jsx";
import Learn from "./components/pages/Learn.jsx";
import Test from "./components/pages/Test.jsx";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Profile from "./components/pages/Profile.jsx";
import About from "./components/pages/About.jsx";
import CreateDeck from "./components/pages/CreateDeck.jsx";
import ManageDeck from "./components/pages/ManageDeck.jsx";
import { setContext } from '@apollo/client/link/context';
import "./index.css";
import SignUp from "./components/pages/Signup.jsx";
import Error from "./components/pages/Error.jsx";
import User from "./components/pages/User.jsx";

const httpLink = createHttpLink({
  uri: "https://quizpro-back-b88671daa38f.herokuapp.com/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ),
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/create",
        element: <CreateDeck />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/decks",
        element: <Decks />,
      },
      {
        path: "/manage/:deckId",
        element: <ManageDeck />,
      },
      {
        path: "/learn/:deckId",
        element: <Learn />,
      },
      {
        path: "/test/:deckId",
        element: <Test />,
      },
      {
        path: "/user/:userId",
        element: <User />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
