import React, { useState } from 'react'
import Input from '../input'
import Button from '../button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/axios-private'

const RegisterForm = () => {

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()


    const handleChange = (e) => {

        const { name, value } = e.target

        setFormValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axiosPrivate.post("http://localhost:8080/auth/register", formValues)
            if (response?.data?.message) {
                toast.success(response?.data?.message)
            } else {
                toast.success('Registered successfully')
            }
            navigate("/login")
        } catch (error) {
            console.log('error from backend', error?.response?.data?.message)

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Failed to register')
            }
        }

        // send backend
    }
    return (

        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5 justify-center items-center pt-5  px-5 xl:px-[600px]'>
                <Input
                    type='text'
                    placeholder='Enter your name'
                    name='name'
                    label="Name"
                    value={formValues.name}
                    onChange={handleChange}
                />
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
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm