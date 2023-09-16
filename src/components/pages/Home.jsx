import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DECKS } from '../../utils/queries'

const Home = () => {

  const {loading, data} = useQuery(ALL_DECKS)

    return (
        <div className='container'>
             <h3>Home</h3>
        </div>
    )
}

export default Home