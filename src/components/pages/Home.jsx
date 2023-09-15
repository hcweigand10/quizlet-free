import { useQuery } from '@apollo/client'
import React, {useState} from 'react'
import { Button } from 'flowbite-react';
import Loading from '../UI/Loading'
import { ALL_DECKS } from '../../utils/queries'

const Home = () => {

  const {loading, data} = useQuery(ALL_DECKS)
  console.log(data)
    return (
        <div className='container'>
             <h3 className=''>All Decks</h3>
          {loading ? <Loading/> : <div>
            {data.allDecks.map(deck => {
              return <DeckPreview name={deck.name} user={deck.createdBy.username} cardCount={deck.cardCount}/>
            })}
            </div>}
             

        </div>
    )
}

const DeckPreview = ({name, user, cardCount}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{user}</p>
      <p>{cardCount}</p>
    </div>
  )
}

export default Home