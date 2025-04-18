import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({ base: 50, total: 120 });
    const [vehicleType, setVehicleType] = useState(null);

    const pickupSuggestions = ['Pickup 1', 'Pickup 2'];
    const destinationSuggestions = ['Destination 1', 'Destination 2'];

    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const handlePickupChange = (e) => {
        setPickup(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const findTrip = () => {
        setVehiclePanel(true);
        setPanelOpen(false);
        setFare({ base: 50, total: 100 }); // Dummy fare
    };

    const createRide = () => {
        setConfirmRidePanel(false);
        setVehicleFound(true);
        setTimeout(() => {
            setVehicleFound(false);
            setWaitingForDriver(true);
        }, 2000);
    };

    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panelOpen ? '70%' : '0%',
            padding: panelOpen ? 24 : 0,
        });
        gsap.to(panelCloseRef.current, {
            opacity: panelOpen ? 1 : 0,
        });
    }, [panelOpen]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [confirmRidePanel]);

    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
            transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [vehicleFound]);

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [waitingForDriver]);

    return (
        <div className='h-screen relative overflow-hidden'>
            <img
                className='w-16 absolute left-5 top-5'
                src='https://ucarecdn.com/b27b6a12-c4b1-4b50-b415-f1f4fd012c45/Screenshot20250405212449.png'
                alt='company Logo'
            />
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>

            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'
                    >
                        <i className='ri-arrow-down-wide-line'></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find your ride🚗</h4>
                    <form className='relative py-3' onSubmit={(e) => e.preventDefault()}>
                        <div className='line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-teal-400 rounded-full'></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type='text'
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                            type='text'
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-teal-300 text-white px-4 py-2 rounded-lg mt-3 w-full'
                    >
                        Find Trip
                    </button>
                </div>

                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={
                            activeField === 'pickup' ? pickupSuggestions : destinationSuggestions
                        }
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            <div
                ref={vehiclePanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
            >
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div
                ref={confirmRidePanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
            >
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={vehicleFoundRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'
            >
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={waitingForDriverRef}
                className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'
            >
                <WaitingForDriver
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
};

export default Home;
