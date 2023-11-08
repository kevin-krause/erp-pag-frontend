/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useState } from 'react'
import InfoInput from '../components/InfoInput'
import SwitchInput from '../components/SwitchInput'
import { BsFillEyeFill } from 'react-icons/bs'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'

const ServiceList = ({ onFormSubmit, data }) => {
    const [services, setServices] = useState(data || [])
    const [newService, setNewService] = useState('')
    const [newValue, setNewValue] = useState('')
    const [showItemFlag, setShowItemFlag] = useState(true)
    // const [itemIndex, setItemIndex] = useState(1)

    const addService = () => {
        if (newService.trim() === '' || newValue <= 0) return
        const newServiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: newService,
            value: newValue,
            showItem: showItemFlag
        }

        setServices([...services, newServiceItem])
        setNewService('')
        setNewValue(0)
        setShowItemFlag(true)
        onFormSubmit([...services, newServiceItem])
    }

    const deleteService = id => {
        const updatedServices = services.filter(service => service.id !== id)
        setServices(updatedServices)
    }

    const totalValue = services.reduce((acc, service) => acc + service.value, 0)

    useEffect(() => {
        if (data) {
            setServices(data)
        }
    }, [data])

    return (
        <div className="w-full">
            <form className="flex gap-4 items-center">
                <InfoInput
                    id="serviceDescription"
                    type="text"
                    label="Descrição"
                    value={newService}
                    requisky="true"
                    onChange={e => setNewService(e.target.value)}
                />

                <InfoInput
                    id="serviceValue"
                    type="number"
                    label="Valor"
                    value={newValue}
                    requisky="true"
                    onChange={e => setNewValue(parseFloat(e.target.value))}
                />
                <div className="p-2 border border-zinc-400 rounded-md flex gap-3 items-center h-[55px]">
                    <h4 className="text-sm text-zinc-400">
                        <BsFillEyeFill />
                    </h4>
                    <SwitchInput
                        onChange={e => setShowItemFlag(e.target.checked)}
                    />
                </div>
            </form>
            <button
                className="bg-zinc-700 border text-white border-zinc-700 px-3 py-1 rounded-lg shadow-md mt-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3"
                onClick={addService}
            >
                Adicionar
            </button>
            <table className="mt-4 p-3 rounded-lg w-full">
                <thead>
                    <tr className="text-left">
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Mostrar na OS</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.description}</td>
                            <td>R${service.value}</td>
                            <td>
                                {service.showItem ? (
                                    <p className="p-1 bg-sky-200 w-[50px] text-center rounded-lg text-sky-700 text-sm">
                                        sim
                                    </p>
                                ) : (
                                    <p className="p-1 bg-red-200 w-[50px] text-center rounded-lg text-red-700 text-sm">
                                        não
                                    </p>
                                )}
                            </td>
                            <td>
                                <button
                                    className="px-2 py-1 bg-red-300 text-red-800 w-full hover:bg-red-500 hover:text-red-300 transition-colors"
                                    onClick={() => deleteService(service.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex gap-2 p-2 bg-slate-300 w-fit text-slate-500 rounded-lg">
                <p>Total:</p>
                <p>{formatCurrencyBRL(totalValue)}</p>
            </div>
        </div>
    )
}

export default ServiceList
