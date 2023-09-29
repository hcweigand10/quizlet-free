import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { PROFILE } from '../../utils/queries'
import Loading from '../UI/Loading'
import auth from '../../utils/auth'
import DeckPreview from '../UI/DeckPreview'
import DeckPreviewManage from '../UI/DeckPreviewManage'
// import { FaBeer, FaCocktail, FaAnchor } from 'react-icons/fa'
import { getIcon } from '../../utils/helpers'

const Profile = () => {

  const {username, _id} = auth.getProfile().data
  
  const {data, loading} = useQuery(PROFILE, {
    variables: {
      userId: _id
    }
  })

  if (loading) {
    return <Loading/>
  }


    return (
        <div className='container max-w-6xl'>
          <div className='grid grid-cols-8'>
            <div className='col-span-1'>
              <img src={getIcon(data.profile.user)} alt={data.profile.user.icon} />
              
            </div>
          </div>
             <h1>Hello, {username}!</h1>
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