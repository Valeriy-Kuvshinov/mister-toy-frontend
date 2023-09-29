import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Link } from '@mui/material'
import * as Yup from 'yup'
import { login, signup } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function LoginPage() {
    const [isSignup, setIsSignup] = useState(false)
    const [errors, setErrors] = useState({})
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    })

    const loginSchema = Yup.object().shape({
        username: Yup.string().required("Username is required").min(4, "Username should be at least 4 characters"),
        password: Yup.string().required("Password is required").min(6, "Password should be at least 6 characters")
    })

    const signupSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Email is not valid"),
        username: Yup.string().required("Username is required").min(4, "Username should be at least 4 characters"),
        password: Yup.string().required("Password is required").min(6, "Password should be at least 6 characters")
    })

    const validate = async () => {
        try {
            if (isSignup) await signupSchema.validate(credentials)
            else await loginSchema.validate(credentials)

            setErrors({})
            return true
        } catch (error) {
            setErrors({ [error.path]: error.message })
            return false
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(await validate())) return
        if (isSignup) {
            try {
                await signup(credentials)
                showSuccessMsg('Signup successful')
                navigate('/toy')
            } catch (error) {
                showErrorMsg('Error signing up')
                console.error(error)
            }
        } else {
            try {
                await login(credentials)
                showSuccessMsg('Welcome back!')
                navigate('/toy')
            } catch (error) {
                showErrorMsg('Error logging in')
                console.error(error)
            }
        }
    }

    return (
        <section className="login-page flex">
            <form onSubmit={handleSubmit}>
                {isSignup ? (
                    <div className='flex flex-column'>
                        <div className="name-container flex flex-row">
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="fname"
                                value={credentials.firstName}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={credentials.lastName}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={credentials.email}
                            error={!!errors.email}
                            helperText={errors.email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={credentials.username}
                            error={!!errors.username}
                            helperText={errors.username}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={credentials.password}
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={handleChange}
                        />
                        <div className='flex flex-row'>
                            <Button variant="contained" color="primary" type="submit" className='btn-submit'>
                                Signup
                            </Button>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => setIsSignup(false)}
                                className="login-toggle-link"
                            >
                                User already exists? Login here!
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-column'>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={credentials.username}
                            error={!!errors.username}
                            helperText={errors.username}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={credentials.password}
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={handleChange}
                        />
                        <div className='flex flex-row'>
                            <Button variant="contained" color="primary" type="submit" className='btn-submit'>
                                Login
                            </Button>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => setIsSignup(true)}
                                className="login-toggle-link"
                            >
                                New user? Signup here!
                            </Link>
                        </div>
                    </div>
                )}
            </form>
        </section>
    )
}