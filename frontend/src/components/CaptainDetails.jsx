import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center justify-start gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-teal-400">
                        <img
                            className="h-full w-full object-cover"
                            src="https://ucarecdn.com/3ea28d63-af0c-43ce-967e-8ae8a0331c62/Screenshot20250331234633.png"
                            alt={`${captain.fullname.firstname}'s profile`}
                        />
                    </div>
                    <h4 className="text-lg font-medium tracking-wide text-gray-800">
                        {captain.fullname.firstname} {captain.fullname.lastname}
                    </h4>
                </div>
                <div className="text-right">
                    <h4 className="text-2xl font-bold text-teal-600 transition-all hover:scale-105">₹0</h4>
                    <p className="text-sm font-medium text-gray-500">Earned</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 bg-teal-50 rounded-xl p-5 transition-all hover:shadow-md">
                <div className="flex flex-col items-center">
                    <div className="bg-teal-100 p-3 rounded-full mb-3">
                        <i className="text-2xl text-teal-600 ri-timer-2-line"></i>
                    </div>
                    <h5 className="text-xl font-semibold text-gray-800">0</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-teal-100 p-3 rounded-full mb-3">
                        <i className="text-2xl text-teal-600 ri-speed-up-line"></i>
                    </div>
                    <h5 className="text-xl font-semibold text-gray-800">0</h5>
                    <p className="text-sm text-gray-600">Total Trips</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-teal-100 p-3 rounded-full mb-3">
                        <i className="text-2xl text-teal-600 ri-booklet-line"></i>
                    </div>
                    <h5 className="text-xl font-semibold text-gray-800">0</h5>
                    <p className="text-sm text-gray-600">Completed</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails