import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

      setEmail('')
      setPassword('')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
      <div className="h-screen w-full bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: `url(https://ucarecdn.com/b27b6a12-c4b1-4b50-b415-f1f4fd012c45/Screenshot20250405212449.png)` }}>

        <div className="absolute top-6 left-6">
          <img
              className="w-14 h-14 object-contain rounded-full shadow-lg"
              src="https://ucarecdn.com/d49e99ec-138e-492f-9ac7-e5fbfeffa2c2/logo.png"
              alt="CabConnect Logo"
          />
        </div>

        <div className="backdrop-blur-lg bg-white/60 p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Welcome Back 👋
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="••••••••"
              />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            New here?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create a new Account
            </Link>
          </p>

          <div className="mt-6">
            <Link
                to="/captain-login"
                className="w-full block py-3 text-center bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Sign in as Captain
            </Link>
          </div>
        </div>
      </div>
  )
}

export default UserLogin
