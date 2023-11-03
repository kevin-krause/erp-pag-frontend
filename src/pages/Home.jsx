import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="p-3 border border-slate-200 w-fit rounded-lg m-3">
            <h1 className='text-lg p-2 bg-slate-200 rounded-md text-slate-700'>Telas mais usadas</h1>
            <ul className='p-2 text-slate-700'>
                <li>
                    <Link to={'/entrances'}>Ordem de serviço</Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
