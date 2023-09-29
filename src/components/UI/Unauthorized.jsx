import React, {useState} from 'react'

const Unauthorized = () => {

    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center w-96 mx-auto mt-20">
      <h2 className="text-xl font-semibold text-red-600 mb-2">
        You must log in first
      </h2>
      <p className="text-gray-600">
        Please log in to access your profile and create new decks.
      </p>
      <a
        href="/login" 
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
      >
        Log In
      </a>
      <a
        href="/signup" 
        className="mt-4 inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full ml-3"
      >
        Sign up
      </a>
    </div>
    )
}

export default Unauthorized