import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 w-full bg-purple-300">
            <div className="hero text-2xl">
                Banks DB
            </div>
            <ul className="flex justify-between items-center space-x-20">
                <li className="nav-item">Branch Search </li>
                <li className="nav-item">Bank Search</li>
            </ul>
        </nav>
    )
}

export default Navbar;
