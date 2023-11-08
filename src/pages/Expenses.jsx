/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { SingleSelect } from '../components/Selector'
import DateInput from '../components/DateInput'
import InfoInput from '../components/InfoInput'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListData from '../components/ListData'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Chart from '../components/Chart'
import { HomeExpensesChartOptions } from '../functions/chartsSettings'

const expenseTypes = ['Boletos', 'Pagamentos', 'Pix']

const Expenses = () => {
    const { id } = useParams()
    const [listKey, setListKey] = useState(Math.random())
    const navigate = useNavigate()
    const [apiData, setApiData] = useState([]) // State to store API data
    const [newExpense, setNewExpense] = useState({
        expenseType: '',
        description: '',
        amount: '',
        date: '',
        payee: '',
        referenceNumber: ''
    })

    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))

    useEffect(() => {
        try {
            fetch(
                'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
            )
                .then(response => response.json())
                .then(data => {
                    const formattedData = data.map(item => ({
                        x: item._id,
                        y: item.amount
                    }))
                    setApiData(formattedData)
                })
        } catch (error) {
            notify(error)
        }
        if (id)
            try {
                fetch(
                    `https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses/${id}`
                )
                    .then(response => response.json())
                    .then(data => {
                        setNewExpense({
                            expenseType: data.expenseType,
                            description: data.description,
                            amount: data.amount,
                            date: data.date,
                            payee: data.payee,
                            referenceNumber: data.referenceNumber
                        })
                    })
            } catch (error) {
                console.log('Error:', error)
                notify('❌', error)
            }
    }, [id])

    const handleFormSubmit = () => {
        if (!newExpense.expenseType) {
            notify('❌', 'Expense Type is required')
            return
        }

        const method = id ? 'PUT' : 'POST'
        const url = id
            ? `https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses/${id}`
            : 'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/newExpense'

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newExpense, _id: id })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message.message)
                    })
                }

                return response.json()
            })
            .then(data => {
                notify('✅', id ? 'Expense Updated' : 'Expense Created')
                setListKey(Math.random())
                console.log(data)
                if (id) {
                    navigate(`/expenses/${id}`)
                } else {
                    navigate(`/expenses/${data.newExpenseId}`)
                }
            })
            .catch(error => {
                notify('❌', error)
                setListKey(Math.random())
            })
    }

    return (
        <div className="grid grid-cols-2 mt-3">
            <div className="col-span-1 mx-6 ">
                <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-blue-200 hover:border-opacity-0 ">
                    <Link to={'/expenses'}> crie uma nova despesa 💰</Link>
                </h1>
                <div className="shadow-lg  mt-[0px] pb-4 rounded-b-lg bg-zinc-100 h-[400px]">
                    <div className="grid grid-cols-2 gap-x-12 p-6 mx-6 mb-[-24px] rounded-b-lg">
                        <div className="rounded-lg shadow-lg">
                            <select
                                id="expense-type-select"
                                name="expenseType"
                                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                value={newExpense.expenseType}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        expenseType: event.target.value
                                    })
                                }
                            >
                                <option value="" disabled>
                                    Expense Type
                                </option>
                                {expenseTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="px-[8px] mx-[-8px]">
                            <input
                                type="date"
                                id="date-input"
                                name="date"
                                className="shadow-lg bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                placeholder="Date"
                                value={newExpense.date}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        date: event.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 p-6 mx-6 mt-[-4px]">
                        <div className="shadow-lg rounded-lg">
                            <input
                                type="text"
                                name="description"
                                id="description-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                placeholder="Description"
                                value={newExpense.description}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        description: event.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="shadow-lg rounded-lg">
                            <input
                                type="number"
                                name="amount"
                                id="amount-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                placeholder="Amount"
                                value={newExpense.amount}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        amount: parseFloat(event.target.value)
                                    })
                                }
                            />
                        </div>

                        <div className="shadow-lg rounded-lg">
                            <input
                                type="text"
                                name="payee"
                                id="payee-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                placeholder="Payee"
                                value={newExpense.payee}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        payee: event.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="shadow-lg rounded-lg">
                            <input
                                type="text"
                                name="referenceNumber"
                                id="referenceNumber-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                placeholder="Reference Number"
                                value={newExpense.referenceNumber}
                                onChange={event =>
                                    setNewExpense({
                                        ...newExpense,
                                        referenceNumber: event.target.value
                                    })
                                }
                            />
                        </div>
                        <div className=" mt-4 flex gap-4">
                            <button
                                className="bg-zinc-900 border text-white border-zinc-900 px-2 py-1 rounded-lg shadow-md w-fit h-[32px] transition-colors hover:bg-blue-600 hover:shadow-blue-200 hover:border-opacity-0 "
                                onClick={handleFormSubmit}
                            >
                                {id ? 'Save' : 'Create'}
                            </button>
                            <button className="bg-orange-500 border text-white border-orange-500 px-2 py-1 rounded-lg shadow-md w-fit h-[32px] transition-colors hover:bg-blue-600 hover:shadow-blue-200 hover:border-opacity-0 ">
                                xml
                            </button>

                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 col-span-1 ">
                <h1 className=" border-2 border-dashed text-black border-blue-500 px-3 py-1 rounded-lg mb-4 w-fit">
                    descubra mais sobre suas despesas 📄
                </h1>
                <div className="flex shadow-md rounded-lg w-full">
                    <ListData
                        titleStyle={'red'}
                        title={'Despesas'}
                        baseUrl={'expenses'}
                        endpoint={
                            'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
                        }
                        key={listKey}
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
            </div>
            <div className="col-span-1 p-6">
                <div className="w-full shadow-lg rounded-lg bg-zinc-100 p-3">
                    <Chart
                        chartData={apiData}
                        chartOptions={HomeExpensesChartOptions}
                    />
                    <ToastContainer />
                </div>
            </div>
            <div className="col-span-1 p-6">
                <div className="w-full shadow-lg rounded-lg bg-zinc-100 p-3">
                    <Chart
                        chartData={apiData}
                        chartOptions={HomeExpensesChartOptions}
                    />
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Expenses
