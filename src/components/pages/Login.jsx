import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import auth from '../../utils/auth'
import { Link } from 'react-router-dom'
import Loading from '../UI/Loading'

const Login = () => {
  const [formState, setFormState] = useState({username: "", password: "",})
  const [loading, setLoading] = useState(false)

  const [login, { error }] = useMutation(LOGIN);

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      setLoading(false)
      const token = mutationResponse.data.login.token;
      auth.login(token)
    } catch (e) {
      console.log(e);
    }
  }

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  if (loading) return <Loading />

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h2 className="font-bold text-center text-2xl mb-5">Quiz Quo Pro</h2>  
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200" >
          <form className="px-5 py-7" onSubmit={formSubmit}>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" 
            name="username"
            value={formState.username}
            onChange={handleInputChange}/>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="password" 
            value={formState.password}
            onChange={handleInputChange}/>
            <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span className="inline-block mr-2">Login</span>
            </button>
          </form>
          <div className="p-5">
              <div className="grid grid-cols-3 gap-1">
                  <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">MailUp</button>
                  <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
                  <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
              </div>
          </div>
        </div>
        {/* <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="inline-block ml-1">Back to your-app.com</span>
                </button>
              </div>
            </div>
          </div> */}
          <Link to="/signup">New here? Sign up instead</Link>
      </div>
    </div>
    )
}

export default Login