import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DECKS } from '../../utils/queries'

const Home = () => {

  const {loading, data} = useQuery(ALL_DECKS)

    return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-4xl font-bold mb-4">Welcome to Quiz Quo Pro</h1>
        <p className="text-gray-600 mb-6">
          Ready to learn something new? Take a look at the decks we have already, or create your own!
        </p>
        <a
          href="/decks"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full inline-block"
        >
          Explore Decks
        </a>
        <a
          href="/create"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full inline-block ml-4"
        >
          Create new
        </a>
      </div>
    </div>
    )
}

export default Home