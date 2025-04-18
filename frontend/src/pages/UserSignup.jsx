import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (err) {
      console.error('Signup failed:', err)
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
            Create your account 🚀
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>

          <p className="text-[11px] text-gray-500 mt-6 leading-tight text-center">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
  )
}

export default UserSignup
