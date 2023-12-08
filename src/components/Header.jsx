import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-zinc-100 shadow-sm">
            <div className="grid grid-cols-3 gap-x-12 items-center max-w-6x mx-auto px-8 py-3">
                <div className="w-fit">
                    <Link to={'/home'}>
                        <h1 className="text-zinc-900 bg-zinc-200 border-2 border-zinc-100 border-opacity-0 font-bold text-sm sm:text-xl flex flex-wrap p-2 h-fit w-fit rounded-xl transition-colors cursor-pointer hover:text-zinc-100 hover:bg-blue-500">
                            {/* <span className="font-bold">Quantum</span> */}
                            <span className="font-thin">nome do sistema</span>
                        </h1>
                    </Link>
                </div>

                <div className="w-full items-center">
                    <form className="bg-zinc-100 border border-zinc-300 p-3 rounded-lg flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent focus:outline-none w-full bg-red-200"
                        />
                        <div className="p-2 hover:text-zinc-100 hover:bg-blue-500 h-fit w-fit rounded-full transition-colors cursor-pointer">
                            <FaSearch />
                        </div>
                    </form>
                </div>

                <div>
                    <ul className="flex gap-4 items-center justify-end ">
                        {/* <Link to={'/sign-in'}>
                            <li className="hidden sm:inline text-black hover:underline px-3 py-1">
                                Home
                            </li>
                        </Link>
                        <Link to={'/sign-in'}>
                            <li className="hidden sm:inline text-black hover:underline px-3 py-1">
                                About
                            </li>
                        </Link> */}
                        <Link to={'/sign-in'}>
                            <li className=" bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md w-fit transition-colors hover:bg-blue-600 hover:shadow-blue-200 hover:border-opacity-0 ">
                                Sign In
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
