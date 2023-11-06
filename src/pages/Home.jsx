import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        user ? console.log('ok') : navigate('/signin')
    })
    return (
        <div className="p-3 border border-slate-200 w-fit rounded-lg m-3">
            <h1 className="text-lg p-2 bg-slate-200 rounded-md text-slate-700">
                Telas mais usadas
            </h1>
            <ul className="p-2 text-slate-700">
                <li>
                    <Link to={'/entrances'}>Ordem de serviço</Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
