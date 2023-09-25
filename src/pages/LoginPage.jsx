import React, { useState } from 'react'
import { Button, TextField, Typography, Grid, Link } from '@mui/material'

export function LoginPage() {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignup) {
            const { firstName, lastName, email, username, password } = formData
            try {
                console.log("Welcome user!");
            } catch (error) {
                console.error("Signup error:", error);
            }
        } else {
            const { username, password } = formData;
            try {
                console.log("Welcome back user!")
            } catch (error) {
                console.error("Login error:", error)
            }
        }
    }

    return (
        <section className="login-page">
            <form onSubmit={handleSubmit}>
                {isSignup ? (
                    <div>
                        <div className="name-container">
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="fname"
                                value={credentials.firstName}
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
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <div>
                            <Button variant="contained" color="primary" type="submit">
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
                    <div>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={credentials.username}
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
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <div>
                            <Button variant="contained" color="primary" type="submit">
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