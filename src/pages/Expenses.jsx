/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Selector, { SingleSelect } from '../components/Selector'
import DateInput from '../components/DateInput'
import InfoInput from '../components/InfoInput'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListData from '../components/ListData'
import { useParams } from 'react-router-dom'

const expenseTypes = ['Boletos', 'Pagamentos', 'Pix']

const Expenses = () => {
    const { id } = useParams()
    const [expenseType, setExpenseType] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('')
    const [payee, setPayee] = useState('')
    const [referenceNumber, setReferenceNumber] = useState('')

    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))

    useEffect(() => {
        try {
            fetch(
                `https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses/${id}`
            )
                .then(response => response.json())
                .then(data => {
                    setExpenseType(data.expenseType)
                    setDescription(data.description)
                    setAmount(data.amount)
                    setDate(data.date)
                    setPayee(data.payee)
                    setReferenceNumber(data.referenceNumber)
                })
        } catch (error) {
            console.log('Error:', error)
            notify('❌', error)
        }
    }, [id])

    const handleFormSubmit = () => {
        const newExpense = {
            expenseType,
            description,
            amount,
            date,
            payee,
            referenceNumber
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
            body: JSON.stringify(newExpense)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message.message)
                    })
                }
                return response.json()
            })
            .then(() => {
                notify('✅', id ? 'Expense Updated' : 'Expense Created')
            })
            .catch(error => {
                notify('❌', error)
            })
    }

    return (
        <div className="grid grid-cols-2 mt-3">
            <div className=" col-span-2 shadow-lg mx-6 mt-[0px] pb-4 rounded-b-lg">
                <div className="">
                    <div className="flex justify-between bg-zinc-200 p-6 mx-6 rounded-b-lg">
                        <div className="mx-[-8px] bg-zinc-100 rounded-lg shadow-lg">
                            <SingleSelect
                                valueDefault={expenseType}
                                title={'Expense Type'}
                                data={expenseTypes}
                                onValueChange={selectedValue => {
                                    setExpenseType(selectedValue)
                                }}
                            />
                        </div>
                        <div className="px-[8px] mx-[-8px] bg-zinc-100 rounded-lg shadow-lg">
                            <DateInput
                                label="Date"
                                value={date}
                                onChange={event => setDate(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="px-[18px] grid grid-cols-2 gap-x-[116px] gap-y-4 p-6  mx-6 mt-[-4px]">
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                value={description}
                                type="text"
                                label="Description"
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                value={amount}
                                type="number"
                                label="Amount"
                                onChange={event =>
                                    setAmount(parseFloat(event.target.value))
                                }
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                value={payee}
                                type="text"
                                label="Payee"
                                onChange={event => setPayee(event.target.value)}
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                value={referenceNumber}
                                type="text"
                                label="Reference Number"
                                onChange={event =>
                                    setReferenceNumber(event.target.value)
                                }
                            />
                        </div>
                        <div className=" mt-4 flex gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white h-fit hover:bg-green-200 hover:text-green-800 transition-colors rounded-md"
                                onClick={handleFormSubmit}
                            >
                                {id ? 'Save' : 'Create'}
                            </button>
                            <button className="px-4 py-2 bg-orange-500 text-white h-fit hover:bg-orange-200 hover:text-orange-800 transition-colors rounded-md">
                                Read XML
                            </button>

                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-4 col-span-full">
                <div className=" shadow-md rounded-lg w-full">
                    <ListData
                        title={'Despesas'}
                        baseUrl={'expenses'}
                        endpoint={
                            'https://backend-pagani-24fdde363504.herokuapp.com/api/expense/expenses'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Expenses
