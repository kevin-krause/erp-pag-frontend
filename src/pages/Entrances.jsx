import React from 'react'
import { useEffect, useState } from 'react'
import Selector, { SingleSelectOS } from '../components/Selector'
import DateInput from '../components/DateInput'
import InfoInput from '../components/InfoInput'
import ServiceList from '../components/ServicesList'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'

const documents_ = ['Ordem de Serviço', 'Invoice', 'Boleto', 'Nota Fiscal']
const model_ = ['Padrão', 'Personalizado']
const payment_ = [
    'Pix',
    'Boleto',
    'Á vista',
    'Parcelado',
    'Cheque',
    'Personalizado'
]

const Entrances = () => {
    const id = useParams()
    const [documents, setDocuments] = useState([])
    const [model, setModel] = useState([])
    const [dataServices, setDataServices] = useState([])
    const [totalItemsValue, setTotalItemsValue] = useState(0)
    const [serviceOrder, setServiceOrder] = useState({
        _id: '',
        doc: '',
        model: '',
        car: '',
        plate: '',
        carOwner: '',
        chassi: '',
        licenseNumber: '',
        documentNumber: '',
        contact: '',
        paymentMethod: '',
        services: [],
        amount: ''
    })

    const notify = (e, title) => (title ? toast(`${title}: ${e}`) : toast(e))

    const handleTotal = osServices => {
        const totalValue = osServices.reduce(
            (acc, service) => acc + service.value,
            0
        )
        setTotalItemsValue(totalValue)
    }

    const handleFormSubmit = osServices => {
        handleTotal(osServices)
        setServiceOrder({
            ...serviceOrder,
            services: osServices
        })
    }
    const createOS = async (osServices, id_) => {
        const total = osServices.reduce(
            (acc, service) => acc + service.value,
            0
        )

        const amountFloat = parseFloat(total)

        setServiceOrder({
            ...serviceOrder,
            _id: id_.id,
            services: osServices,
            amount: amountFloat
        })

        const updatedServiceOrder = {
            ...serviceOrder,
            _id: id_.id,
            services: osServices,
            amount: amountFloat
        }

        const method = id_.id === undefined ? 'POST' : 'PUT'
        const url =
            id_.id === undefined
                ? 'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/newOS'
                : `https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders/${id_.id}`

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...(method === 'POST' ? updatedServiceOrder : serviceOrder),
                amount: amountFloat
            })
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
                notify('✅', 'OS Criada')
            })
            .catch(error => {
                notify('❌', error)
            })
    }

    useEffect(() => {
        if (id.id)
            try {
                fetch(
                    `https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/orders/${id.id}`
                )
                    .then(response => response.json())
                    .then(data => {
                        setServiceOrder(data)
                        setDataServices(data.services)
                    })
            } catch (error) {
                notify(error)
            }
        setDocuments(documents_)
        setModel(model_)
    }, [id.id])

    return (
        <div>
            <div className="grid grid-cols-2 gap-x-8 mt-4 h-fit items-center px-6">
                <div className="flex justify-between mx-[-6px]">
                    <Selector
                        title={'Doc.'}
                        data={documents}
                        onChange={event =>
                            setServiceOrder({
                                ...serviceOrder,
                                doc: event.target.value
                            })
                        }
                    />
                    <Selector
                        title={'Model'}
                        data={model}
                        onChange={event =>
                            setServiceOrder({
                                ...serviceOrder,
                                model: event.target.value
                            })
                        }
                    />
                </div>
                <div className="flex justify-between">
                    <DateInput
                        label="Abertura"
                        onChange={event =>
                            setServiceOrder({
                                ...serviceOrder,
                                abertura: event.target.value
                            })
                        }
                    />
                    <DateInput
                        label="Fechamento"
                        onChange={event =>
                            setServiceOrder({
                                ...serviceOrder,
                                fechamento: event.target.value
                            })
                        }
                    />
                    {/* 
                    <span className="my-2 p-2 text-sm text-green-600 bg-green-200 w-[100px] rounded-lg">
                        <p className="font-mono">status aberta</p>
                    </span> */}
                </div>
            </div>
            <div className="flex px-6 py-4 mt-2 gap-x-8 justify-between border-t  bg-zinc-100 bg-gradient-to-tl">
                <div className="bg-zinc-100 shadow-md border-zinc-400 rounded-lg w-full">
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md w-fit mx-6 mb-0 mt-3">
                        Notas
                    </h1>
                    <div className="p-6 grid grid-cols-2 gap-8">
                        <InfoInput
                            id="car"
                            type="text"
                            label="Carro"
                            value={id.id !== undefined ? serviceOrder.car : ''}
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    car: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="plate"
                            type="text"
                            label="Placa"
                            value={
                                id.id !== undefined ? serviceOrder.plate : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    plate: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="carOwner"
                            type="text"
                            label="Dono"
                            value={
                                id.id !== undefined ? serviceOrder.carOwner : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    carOwner: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="chassi"
                            type="text"
                            label="Chassi"
                            value={
                                id.id !== undefined ? serviceOrder.chassi : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    chassi: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="licenseNumber"
                            type="text"
                            label="Doc. Identificação"
                            value={
                                id.id !== undefined
                                    ? serviceOrder.licenseNumber
                                    : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    licenseNumber: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="documentNumber"
                            type="text"
                            label="Doc. Veículo"
                            value={
                                id.id !== undefined
                                    ? serviceOrder.documentNumber
                                    : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    documentNumber: event.target.value
                                })
                            }
                        />
                        <InfoInput
                            id="contact"
                            type="text"
                            label="Contato"
                            value={
                                id.id !== undefined ? serviceOrder.contact : ''
                            }
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    contact: event.target.value
                                })
                            }
                        />
                    </div>
                    <span className="block border border-b-zinc-300 opacity-40"></span>
                    <div className="p-6 grid grid-cols-3 gap-8 items-center">
                        <div className="col-span-2 ml-[-4px]">
                            <SingleSelectOS
                                valueDefault={
                                    id.id !== undefined
                                        ? serviceOrder.paymentMethod
                                        : ''
                                }
                                title={'Pagamento'}
                                data={payment_}
                                onValueChange={selectedValue => {
                                    setServiceOrder({
                                        ...serviceOrder,
                                        paymentMethod: selectedValue
                                    })
                                }}
                            />
                        </div>
                        <p className="p-4 flex justify-center rounded-lg bg-green-200 text-green-600">
                            {formatCurrencyBRL(totalItemsValue)}
                        </p>
                    </div>
                    <div className=" px-6 grid grid-cols-1 gap-8 items-center">
                        <button
                            className="bg-zinc-700 border text-white border-zinc-700 px-3 py-1 rounded-lg shadow-md mb-4 w-fit transition-colors hover:bg-blue-600 hover:shadow-lg hover:shadow-sky-200  hover:border-opacity-0 p-3"
                            onClick={() => createOS(serviceOrder.services, id)}
                        >
                            {id.id === undefined ? 'Criar OS' : 'Save OS'}
                        </button>
                        <ToastContainer />
                    </div>
                </div>
                <div className="bg-zinc-100 shadow-md border-zinc-400 rounded-lg w-full">
                    <h1 className="bg-zinc-900 border text-white border-zinc-900 px-3 py-1 rounded-lg shadow-md w-fit  mx-6 mb-0 mt-3">
                        Serviços
                    </h1>
                    <div className="p-6 flex gap-8">
                        <ServiceList
                            onFormSubmit={handleFormSubmit}
                            data={dataServices || ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entrances
