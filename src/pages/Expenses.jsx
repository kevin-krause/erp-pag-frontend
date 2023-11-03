/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import Selector, { SingleSelect } from '../components/Selector'
import DateInput from '../components/DateInput'
import InfoInput from '../components/InfoInput'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const expenseTypes = ['Boletos', 'Pagamentos', 'Pix']

const Expenses = () => {
    const [expenseType, setExpenseType] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('')
    const [payee, setPayee] = useState('')
    const [referenceNumber, setReferenceNumber] = useState('')

    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))

    const handleFormSubmit = () => {
        const newExpense = {
            expenseType,
            description,
            amount,
            date,
            payee,
            referenceNumber
        }

        console.log(newExpense)

        fetch(
            'https://api-pagani-932e9d7b1daf.herokuapp.com/expense/newExpense',
            {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_JWT_TOKEN'
                },
                body: JSON.stringify(newExpense)
            }
        )
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message.message)
                    })
                }
                return response.json()
            })
            .then(() => {
                notify('✅', 'Expense Created')
            })
            .catch(error => {
                notify('❌', error)
            })
    }

    return (
        <div className="grid grid-cols-3">
            <div className="px-6 col-span-2 shadow-lg mx-6 mt-[0px] pb-4 rounded-b-lg">
                <div className="">
                    <div className="flex justify-between bg-zinc-200 p-6 mx-6 rounded-b-lg">
                        <div className="mx-[-8px] bg-zinc-100 rounded-lg shadow-lg">
                            <SingleSelect
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
                                onChange={event => setDate(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="px-[18px] grid grid-cols-2 gap-x-[116px] gap-y-4 p-6  mx-6 mt-[-4px]">
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                type="text"
                                label="Description"
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                type="number"
                                label="Amount"
                                onChange={event =>
                                    setAmount(parseFloat(event.target.value))
                                }
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                type="text"
                                label="Payee"
                                onChange={event => setPayee(event.target.value)}
                            />
                        </div>
                        <div className="shadow-lg w-[200px]">
                            <InfoInput
                                type="text"
                                label="Reference Number"
                                onChange={event =>
                                    setReferenceNumber(event.target.value)
                                }
                            />
                        </div>
                        <div className=" mt-4 flex gap-4">
                            <button
                                className="border-2 px-4 py-2 bg-slate-900 text-sky-200 h-fit hover:bg-slate-800 hover:border-sky-200 transition-colors  rounded-md"
                                onClick={handleFormSubmit}
                            >
                                Create
                            </button>
                            <button className="border-2 px-4 py-2 bg-green-200 text-green-500 hover:bg-green-300 border-green-500 hover:border-green-200 transition-colors  rounded-md">
                                Read XML
                            </button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>

            <div>Lista de Notas lançadas por ordem de periodo...</div>
        </div>
    )
}

export default Expenses
