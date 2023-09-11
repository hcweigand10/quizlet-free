import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import './index.css'
import CreateDeck from './components/pages/CreateDeck.jsx'
import ManageDeck from './components/pages/ManageDeck.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/create",
        element: <CreateDeck/>
      },
      {
        path: "/manage/:deckId",
        element: <ManageDeck />
      },
      {
        path: "/play/:deckId",
        element: <Play />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
