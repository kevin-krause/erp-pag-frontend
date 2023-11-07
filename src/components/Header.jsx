import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-zinc-100 shadow-sm">
            <div className="flex justify-between items-center max-w-6x mx-auto px-8 py-3">
                <Link to={'/home'}>
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-green-500 font-semibold">
                            Bloc
                        </span>
                        <span className="text-green-900 font-semibold">
                            .Note
                        </span>
                    </h1>
                </Link>
                <form className="bg-zinc-100 border border-zinc-300 p-3 rounded-lg flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                    />
                    <div className="p-2 hover:text-zinc-100 hover:bg-blue-500 h-fit w-fit rounded-full transition-colors cursor-pointer">
                        <FaSearch />
                    </div>
                </form>
                <ul className="flex gap-4 items-center ">
                    <Link to={'/sign-in'}>
                        <li className="hidden sm:inline text-black hover:underline px-3 py-1">
                            Home
                        </li>
                    </Link>
                    <Link to={'/sign-in'}>
                        <li className="hidden sm:inline text-black hover:underline px-3 py-1">
                            About
                        </li>
                    </Link>
                    <Link to={'/sign-in'}>
                        <li className=" bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md w-fit ">
                            Sign In
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
