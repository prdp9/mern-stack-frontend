import React, { useState } from 'react'
import Input from '../input'
import Button from '../button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import useAxiosPrivate from '../../hooks/axios-private'
import { useMutation } from '@tanstack/react-query'

const LoginForm = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()

    const { setAccessToken, setIsAuthenticated } = useAuth()

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }


    const loginMutate = useMutation({
        mutationFn: async (formData) => await axiosPrivate.post("auth/login", formData),
        onSuccess: (response) => {
            if (response?.data?.message) {
                toast.success(response?.data?.message)
            } else {
                toast.success('Logged in successfully')
            }
            // for access token using localstorage
            localStorage.setItem("accessToken", response?.data?.accessToken)
            // for refresh and acess token
            setAccessToken(response?.data?.accessToken)
            // for both method
            setIsAuthenticated(true)
            navigate("/dashboard")
        },
        onError: (error) => {
            console.log('error from backend', error?.response?.data?.message)

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Failed to log in')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginMutate.mutate(formValues)

    }
    return (

        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5 justify-center items-center pt-5 px-5 xl:px-[600px]'>
                <Input type='email' placeholder='Enter your email'
                    value={formValues.email}
                    name='email'
                    label="Email"
                    onChange={handleChange}

                />
                <Input type='password'
                    label="Password"
                    placeholder='Enter your password'
                    value={formValues.password}
                    onChange={handleChange}
                    name='password'

                />

                <Button>
                    {
                        loginMutate.isLoading ? 'Loading...' : 'Submit'
                    }
                </Button>
            </div>
        </form>
    )
}

export default LoginForm