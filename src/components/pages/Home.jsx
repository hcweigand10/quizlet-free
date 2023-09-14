import { useQuery } from '@apollo/client'
import React, {useState} from 'react'
import { Button } from 'flowbite-react';
import Loading from '../UI/Loading'
import { ALL_DECKS } from '../../utils/queries'

const Home = () => {

  const {loading, data} = useQuery(ALL_DECKS)

    return (
        <div className='container'>
          {loading ? <Loading/> : <div></div>}
             <h3 className='underline'>Home</h3>
             <Button/>

        </div>
    )
}

export default Home