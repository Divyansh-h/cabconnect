import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div className="h-screen w-full bg-cover bg-center flex items-center justify-center"
             style={{ backgroundImage: `url(https://ucarecdn.com/b27b6a12-c4b1-4b50-b415-f1f4fd012c45/Screenshot20250405212449.png)` }}>

            <div className="absolute top-6 left-6">
                <img
                    className="w-14 h-14 object-contain rounded-full shadow-lg"
                    src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
                    alt="CabConnect Logo"
                />
            </div>

            <div className="backdrop-blur-lg bg-white/60 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 tracking-wide">
                    Start with <span className="text-black">Trawell</span> 🚗
                </h2>
                <p className="text-sm text-gray-600 mb-6">Your journey starts here.</p>

                <Link
                    to="/login"
                    className="inline-block w-full py-3 rounded-lg bg-white text-blue-900 font-medium transition hover:bg-gray-800"
                >
                    Continue
                </Link>
            </div>
        </div>
    )
}

export default Start
