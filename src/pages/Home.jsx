import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListData from '../components/ListData'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.currentUser._id === null) {
            navigate('/sign-in')
        }
    })
    return (
        <div className="p-6 m-3">
            <div className="p-3 border border-slate-200 rounded-lg w-fit mb-3">
                <h1 className="text-lg p-2 bg-slate-200 rounded-md text-slate-700">
                    Telas mais usadas
                </h1>
                <ul className="p-2 text-slate-700">
                    <li>
                        <Link to={'/entrances'}>Ordem de serviço</Link>
                    </li>
                    <li>
                        <Link to={'/expenses'}>Despesas</Link>
                    </li>
                </ul>
            </div>

            <div>
                <div className="flex flex-col gap-8 p-6">
                    <div className="w-fit shadow-md rounded-lg ">
                        <ListData
                            title={'Despesas'}
                            baseUrl={'expenses'}
                            endpoint={
                                'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
                            }
                        />
                    </div>
                    <div className="w-fit shadow-md rounded-lg">
                        <ListData
                            title={'Ordens de serviço'}
                            baseUrl={'entrances'}
                            endpoint={
                                'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders'
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
