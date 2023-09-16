import { useState, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from './utils/queries';
import NavbarComp from './components/UI/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://quizpro-back-b88671daa38f.herokuapp.com/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {

  // const {data, loading} = useQuery(ME, {
  //   onCompleted: () => {
  //     console.log(data)
  //     setUsername(data.user?.username || null)
  //   }
  // })
  

  return (
    <div className='h-screen bg-slate-100'>
      <NavbarComp/>
      <Outlet />
    </div>
  )
}

export default App
