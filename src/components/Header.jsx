import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-slate-900 shadow-md">
            <div className="flex justify-between items-center max-w-6x mx-auto px-8 py-3">
                <Link to={'/home'}>
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-300">sankhya</span>
                        <span className="text-slate-500">.erp</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                    />
                    <FaSearch />
                </form>
                <ul className="flex gap-4 items-center">
                    <Link to={'/'}>
                        <li className="hidden sm:inline text-slate-100 hover:underline">
                            Home
                        </li>
                    </Link>
                    <Link to={'/about'}>
                        <li className="hidden sm:inline text-slate-100 hover:underline">
                            About
                        </li>
                    </Link>
                    <Link to={'/sign-in'}>
                        <li className=" text-slate-500 hover:underline text-sm px-2 py-1 bg-zinc-300 rounded-lg ">
                            Sign In
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
