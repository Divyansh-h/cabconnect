import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = { email, password }

    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
    )

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
      <div className="min-h-screen bg-teal-600 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-md p-6">
          <div className="text-center mb-6">
            <img
                className="w-12 mx-auto mb-2"
                src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
                alt="Logo"
            />
            <h2 className="text-lg font-semibold text-gray-800">Captain Login</h2>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your email
              </label>
              <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none"
                  type="email"
                  placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Password
              </label>
              <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none"
                  type="password"
                  placeholder="password"
              />
            </div>

            <button
                type="submit"
                className="w-full bg-white text-teal-600 border border-teal-600 font-semibold rounded px-4 py-2 text-sm"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Join a fleet?{' '}
            <Link to="/captain-signup" className="text-blue-600 underline">
              Register as a Captain
            </Link>
          </p>

          <div className="mt-6">
            <Link
                to="/login"
                className="w-full block text-center bg-white text-teal-600 border border-teal-600 font-semibold rounded px-4 py-2 text-sm"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Captainlogin
