import { useQuery } from '@apollo/client'
import React, {useState} from 'react'
import Loading from '../UI/Loading'
import { QUERY_ALLDECKS } from '../../utils/queries'

const Home = () => {

  const {loading, data} = useQuery(QUERY_ALLDECKS)

  console.log(data)

    return (
        <div className='container'>
          {loading ? <Loading/> : <div></div>}
             <h3>Home</h3>
             
        </div>
    )
}

export default Home