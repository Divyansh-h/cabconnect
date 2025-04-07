import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/captains/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    localStorage.removeItem('captain-token')
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error('Logout failed:', error)
                navigate('/captain-login')
            }
        }

        logoutCaptain()
    }, [navigate, token])

    return <div>Logging out...</div>
}

export default CaptainLogout
