import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListData from '../components/ListData'
import Chart from '../components/Chart'
import { ToastContainer, toast } from 'react-toastify'
import {
    HomeExpensesChartOptions,
    HomeOSChartOptions
} from '../functions/chartsSettings'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))
    const [apiDataExpenses, setApiDataExpenses] = useState([]) // State to store API data
    const [apiDataOS, setApiDataOS] = useState([])
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
                            x: item.createdAt, // Assuming createdAt is a date field
                            y: item.amount
                        }))
                        setApiDataExpenses(formattedData)
                    })
            } catch (error) {
                notify(error)
            }
            try {
                fetch(
                    'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders'
                )
                    .then(response => response.json())
                    .then(data => {
                        const formattedData = data.map(item => ({
                            x: item.createdAt, // Assuming createdAt is a date field
                            y: item.amount
                        }))
                        setApiDataOS(formattedData)
                    })
            } catch (error) {
                notify(error)
            }
        }
    }, [user.currentUser._id, navigate])
    return (
        <div className="p-6 m-3 grid grid-cols-2">
            {/* <div className="col-span-2">
                <div className="px-6 py-2 my-[-8px] mb-2">
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3">
                        <Link to={'/expenses'}>Despesas 🛠️</Link>
                    </h1>
                    <div className="w-full shadow-lg rounded-lg">
                        <Chart
                            chartData={apiDataExpenses}
                            chartOptions={HomeExpensesChartOptions}
                        />
                        <ToastContainer />
                    </div>
                </div>
            </div>
            <div className="h-[400px]">
                <h1 className=" border-2 border-dashed text-black border-blue-500 px-3 py-1 rounded-lg mb-4 w-fit">
                    edite suas telas mais usadas 👩🏻‍💻
                </h1>
                <div className=" p-2 items-center bg-zinc-200 rounded-md shadow-md ">
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
                </div>
            </div>

            <div className="p-6 col-span-3 w-full bg-zinc-200 border-t border-zinc-600">
                <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3">
                    <Link to={'/entrances'}>Entradas 💸 🛠️</Link>
                </h1>
                <div className="flex gap-8">
                    <div className="shadow-lg rounded-lg w-fit h-fit">
                        <ListData
                            title={'Ordens de serviço'}
                            baseUrl={'entrances'}
                            height={'500px'}
                            endpoint={
                                'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders'
                            }
                            visibleColumns={[
                                { name: 'carOwner', alias: 'Dono' },
                                { name: 'car', alias: 'Carro' },
                                { name: 'amount', alias: 'Total' },
                                { name: 'createdAt', alias: 'Abertura' },
                                { name: 'updatedAt', alias: 'Atualizado' },
                                { name: 'contact', alias: 'Contato' }
                            ]}
                        />
                    </div>
                    <div className="w-full shadow-lg rounded-lg bg-zinc-100 p-3">
                        <Chart
                            chartData={apiDataOS}
                            chartOptions={HomeOSChartOptions}
                        />
                        <ToastContainer />
                    </div>
                </div>
            </div> */}
            <div className="p-6 col-span-2 w-full bg-zinc-200 border-t border-zinc-600">
                <div className="flex gap-3">
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3">
                        <Link to={'/entrances'}>Entradas 💸</Link>
                    </h1>
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3">
                        <Link to={'/expenses'}>Despesas 🛠️</Link>
                    </h1>
                </div>
                <div className="flex gap-8">
                    <div className="shadow-lg rounded-lg w-fit h-fit">
                        <ListData
                            title={'Ordens de serviço'}
                            baseUrl={'entrances'}
                            height={'500px'}
                            endpoint={
                                'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders'
                            }
                            visibleColumns={[
                                { name: 'carOwner', alias: 'Dono' },
                                { name: 'car', alias: 'Carro' },
                                { name: 'amount', alias: 'Total' },
                                { name: 'createdAt', alias: 'Abertura' },
                                { name: 'updatedAt', alias: 'Atualizado' },
                                { name: 'contact', alias: 'Contato' }
                            ]}
                        />
                    </div>
                    <div className="w-full shadow-lg rounded-lg bg-zinc-100 p-3">
                        <Chart
                            chartData={apiDataOS}
                            chartOptions={HomeOSChartOptions}
                        />
                        <ToastContainer />
                    </div>
                </div>
            </div>
            <div className="p-6 col-span-3 w-full bg-zinc-200 border-t border-zinc-600">
                <div className="flex gap-8">
                    <div className="shadow-lg rounded-lg w-fit h-fit">
                        <ListData
                            titleStyle={'red'}
                            title={'Despesas'}
                            baseUrl={'expenses'}
                            endpoint={
                                'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
                            }
                            visibleColumns={[
                                { name: 'description', alias: 'Dono' },
                                { name: 'payee', alias: 'Pagador' },
                                { name: 'amount', alias: 'Valor' },
                                { name: 'createdAt', alias: 'Abertura' },
                                { name: 'updatedAt', alias: 'Atualização' }
                            ]}
                            height={'400px'}
                        />
                    </div>
                    <div className="px-6 py-2 my-[-8px] mb-2">
                        <div className="w-full shadow-lg rounded-lg bg-zinc-100 p-3">
                            <Chart
                                chartData={apiDataExpenses}
                                chartOptions={HomeExpensesChartOptions}
                            />
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
