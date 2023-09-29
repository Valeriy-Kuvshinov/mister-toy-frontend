import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/user.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const navigate = useNavigate()
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header flex">
            <h1><span role="img" aria-label="toy">🧸</span> Mr. Toy <span style={{ color: '#036817' }} role="img" aria-label="tree">♻</span></h1>
            <nav>
                <ul className="nav-links flex">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/toy">Toys</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {
                        user && user.isAdmin ? (
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        ) : null
                    }
                    {
                        user && user.isAdmin ? (
                            <li><Link to="/toy/edit">New Toy</Link></li>
                        ) : null
                    }
                    <li className="user-details flex">
                        {
                            user ? (
                                <>
                                    <span>Hello {user.firstName}!</span>
                                    <button onClick={onLogout}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}