import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="https://ucarecdn.com/c918d418-4d35-4260-a3bb-c5c8052d4e77/logoremovebgpreview.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Trawell sedan <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>8 mins away </h5>

                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('SUV')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="https://ucarecdn.com/a9d814d5-1693-4178-9799-9d9a8318e139/ChatGPT_Image_Apr_6__2025__10_50_28_AMremovebgpreview.png" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>trawell SUV <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>20 mins away </h5>

                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('ECONOMY')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="https://ucarecdn.com/8b2c07c4-b889-4afe-99eb-a7c79a9d23b4/ChatGPT_Image_Apr_6__2025__10_53_02_AMremovebgpreview.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>trawell economy <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>5 mins away </h5>

                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel