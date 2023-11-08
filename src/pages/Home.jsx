import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListData from '../components/ListData'
import Chart from '../components/Chart'
import { ToastContainer, toast } from 'react-toastify'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))
    const [apiData, setApiData] = useState([]) // State to store API data

    const mainChartOptions = {
        chart: {
            type: 'area',
            height: 420,
            fontFamily: 'Inter, sans-serif'
            // ... other options
        }
        // ... other options
    }

    useEffect(() => {
        if (user.currentUser._id === null) {
            navigate('/sign-in')
        } else {
            try {
                fetch(
                    'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
                )
                    .then(response => response.json())
                    .then(data => {
                        const formattedData = data.map(item => ({
                            x: new Date(item.createdAt).getTime(), // Assuming createdAt is a date field
                            y: item.amount
                        }))
                        setApiData(formattedData)
                    })
            } catch (error) {
                notify(error)
            }
        }
    })
    return (
        <div className="p-6 m-3 grid grid-cols-3">
            <div className="col-span-2">
                <div className="px-6 py-2 my-[-8px] mb-2">
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit">
                        Despesas 🛠️
                    </h1>
                    <div className="w-full shadow-lg rounded-lg">
                        <Chart
                            chartData={apiData}
                            chartOptions={mainChartOptions}
                        />
                        <ToastContainer />
                    </div>
                </div>
            </div>
            <div className=" grid grid-cols-2 p-2 m-6 items-center bg-zinc-200 rounded-md shadow-md">
                <div className="p-3 border border-red-200 bg-red-200 rounded-lg w-[190px] hue-rotate-180 m-3 shadow-md">
                    <h1 className="text-lg p-2 bg-slate-900 rounded-md text-white animate-pulse hue-rotate-90">
                        telas mais usadas
                    </h1>
                    <ul className="p-2 text-black rounded-lg bg-white my-2">
                        <li>
                            <Link to={'/entrances'}>Ordem de serviço</Link>
                        </li>
                        <li>
                            <Link to={'/expenses'}>Despesas</Link>
                        </li>
                    </ul>
                </div>
                <div className="p-3 border border-green-600 bg-green-600  rounded-lg w-[190px] m-3 shadow-md">
                    <h1 className="text-lg p-2 bg-green-500 rounded-md text-white">
                        teste 1
                    </h1>
                    <ul className="p-2 text-black rounded-lg bg-white my-2">
                        <li>
                            <Link to={'/entrances'}>Ordem de serviço</Link>
                        </li>
                        <li>
                            <Link to={'/expenses'}>Despesas</Link>
                        </li>
                    </ul>
                </div>
                <div className="p-3 border border-yellow-200 bg-yellow-200 rounded-lg w-[190px] m-3 shadow-md">
                    <h1 className="text-lg p-2 bg-yellow-500 rounded-md text-yellow-100">
                        teste 2
                    </h1>
                    <ul className="p-2 text-black rounded-lg bg-white my-2">
                        <li>
                            <Link to={'/entrances'}>Ordem de serviço</Link>
                        </li>
                        <li>
                            <Link to={'/expenses'}>Despesas</Link>
                        </li>
                    </ul>
                </div>
                <div className="p-3 border border-blue-200 bg-blue-500 rounded-lg w-[190px] m-3 shadow-md">
                    <h1 className="text-lg p-2 bg-sky-800 rounded-md text-white">
                        teste 3
                    </h1>
                    <ul className="p-2 text-black rounded-lg bg-white my-2">
                        <li>
                            <Link to={'/entrances'}>Ordem de serviço</Link>
                        </li>
                        <li>
                            <Link to={'/expenses'}>Despesas</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="p-6 col-span-3 w-full bg-zinc-200 border-t border-zinc-600">
                <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 mb-4 rounded-lg shadow-md w-fit">
                    Entradas 💸
                </h1>
                <div className="shadow-lg rounded-lg w-fit">
                    <ListData
                        title={'Ordens de serviço'}
                        baseUrl={'entrances'}
                        endpoint={
                            'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders'
                        }
                        visibleColumns={[
                            { name: 'carOwner', alias: 'Dono' },
                            { name: 'car', alias: 'Carro' },
                            { name: 'amount', alias: 'Total' },
                            { name: 'createdAt', alias: 'Abertura' },
                            { name: 'updatedAt', alias: 'Fechamento' },
                            { name: 'contact', alias: 'Contato' }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
