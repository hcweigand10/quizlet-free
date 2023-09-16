import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { PROFILE } from '../../utils/queries'
import Loading from '../UI/Loading'
import auth from '../../utils/auth'
import DeckPreview from '../UI/DeckPreview'
import DeckPreviewManage from '../UI/DeckPreviewManage'

const Profile = () => {

  const {username, _id} = auth.getProfile().data
  
  const {data, loading} = useQuery(PROFILE, {
    variables: {
      userId: _id
    }
  })
  console.log(data)

  if (loading) {
    return <Loading/>
  }


    return (
        <div className='container'>
             <h3>Hello, {username}!</h3>
             <h2>Your decks:</h2>
             <div>
              {data.profile.decks.map((deck) => {
                return <DeckPreviewManage name={deck.name} id={deck._id} description={deck.description} user={null} cardCount={deck.cardCount} edit={true}/>
              })}
             </div>
        </div>
    )
}

export default Profile