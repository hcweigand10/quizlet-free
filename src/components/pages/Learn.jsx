import { useQuery } from '@apollo/client'
import React, {useState, useEffect} from 'react'
import { DECK } from '../../utils/queries'

const Learn = () => {
  const [unseen, setUnseen] = useState([])
  const [levelOne, setLevelOne] = useState([])
  const [levelTwo, setLevelTwo] = useState([])
  const [levelThree, setLevelThree] = useState([])

  const deckId = window.location.pathname.split("/")[2]

  const {data, loading} = useQuery(DECK, {variables: {deckId}})

  useEffect(() => {
    if (data) {
      setUnseen(data.deck.cards)
    }
  }, [data])
  

    return (
        <div className='container'>
             <h1>Learn</h1>
            <h4>Unseen: {unseen.length}</h4>
            <h4>Still learning: {levelOne.length}</h4>
            <h4>Almost: {levelTwo.length}</h4>
            <h4>Locked down: {levelThree.length}</h4>
        </div>
    )
}

export default Learn