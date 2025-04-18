import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
      <div className="min-h-screen bg-teal-600 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-md p-6 text-gray-800">
          <div className="text-center mb-6">
            <img
                className="w-12 mx-auto mb-4"
                src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
                alt="Logo"
            />
            <h2 className="text-xl font-semibold">Captain Signup</h2>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="flex gap-2">
              <input
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
                required
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                required
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <input
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  type="text"
                  placeholder="Vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  type="text"
                  placeholder="Vehicle Plate"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <input
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  type="number"
                  placeholder="Capacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                  required
                  className="w-1/2 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-teal-600"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-2 bg-white text-teal-700 border border-teal-600 rounded text-sm font-medium hover:bg-teal-50 transition"
            >
              Create Captain Account
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/captain-login" className="text-teal-700 underline">Login here</Link>
          </p>

          <p className="text-[10px] text-center mt-4 text-gray-500">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
  )
}

export default CaptainSignup
