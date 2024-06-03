import React, { useState } from 'react'
import { useAuth } from '../hooks/auth'
import Button from '../components/button'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UserInfo from '../components/user-info'
import useAxiosPrivate from '../hooks/axios-private'

const DashboardPage = () => {
    const { accessToken, isAuthenticated, setAccessToken, setIsAuthenticated } = useAuth()

    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()

    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await axiosPrivate.post('/auth/logout')
            if (response?.data?.message) {
                toast.success(response?.data?.message)
            } else {
                toast.success('Logged out successfully')
            }
            setAccessToken(null)
            setIsAuthenticated(false)
            navigate("/login")
        } catch (error) {
            console.log(error)
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Failed to logout')
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center '>
            <h2>DashboardPage</h2>


            <UserInfo />
            <Button onClick={handleLogout}>
                {
                    isLoading ? 'Logging out...' : 'Logout'
                }
            </Button>
        </div>
    )
}

export default DashboardPage