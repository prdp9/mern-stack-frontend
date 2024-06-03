import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth'
import Button from './button'
import useRefresh from '../hooks/refresh'
import useAxiosPrivate from '../hooks/axios-private'

const UserInfo = () => {

    const [user, setUser] = useState(null)
    const { accessToken, isAuthenticated, } = useAuth()

    const axiosPrivate = useAxiosPrivate()

    async function fetchUser() {
        try {
            const response = await axiosPrivate.get("/user")
            setUser(response.data)

        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
            fetchUser()

    }, [accessToken, isAuthenticated])


    // axios interceptors
    // refresh token - 403 -> trigger getNewAccessToken
    // refresh, axios private hooks

    return (
        <div>
            <h2>User Info</h2>
            <div>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
               
            </div>
        </div>
    )
}

export default UserInfo