import React from 'react'
import { Link } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header">
            <h1><span role="img" aria-label="toy">🧸</span> Mr. Toy <span style={{ color: '#036817' }} role="img" aria-label="tree">♻</span></h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/toy">
                            Toys
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/toy/edit">
                            New Toy
                        </Link>
                    </li>
                    <li>
                        <Link to="/toy/edit/new">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}