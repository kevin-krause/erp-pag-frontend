import React from 'react'
import { useEffect, useState } from 'react'
import Selector, { SingleSelect } from '../components/Selector'
import DateInput from '../components/DateInput'
import InfoInput from '../components/InfoInput'
import ServiceList from '../components/ServicesList'
import formatCurrencyBRL from '../functions/formatCurrencyBRL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    const [documents, setDocuments] = useState([])
    const [model, setModel] = useState([])
    const [totalItemsValue, setTotalItemsValue] = useState(0)
    const [serviceOrder, setServiceOrder] = useState({
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
    const createOS = async osServices => {
        const total = osServices.reduce(
            (acc, service) => acc + service.value,
            0
        )

        const amountFloat = parseFloat(total)

        setServiceOrder({
            ...serviceOrder,
            services: osServices,
            amount: amountFloat
        })

        console.log(serviceOrder)
        fetch(
            'https://backend-pagani-24fdde363504.herokuapp.com/api/serviceOrder/newOS',
            {   
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...serviceOrder,
                    amount: amountFloat
                })
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
                notify('✅', 'OS Criada')
            })
            .catch(error => {
                notify('❌', error)
            })
    }

    useEffect(() => {
        setDocuments(documents_)
        setModel(model_)
    }, [documents, model])

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
                    <span className="m-2 p-2 text-xs border-2  border-zinc-200 w-[100px] flex flex-col rounded-lg">
                        <p className="px-1 bg-zinc-500 w-fit rounded-sm text-zinc-200">
                            total
                        </p>
                        <p className="mt-1 text-md">
                            {formatCurrencyBRL(totalItemsValue)}
                        </p>
                    </span>
                    <span className="my-2  ml-[-10px] p-2 text-xs bg-green-200 w-[85px] flex flex-col rounded-lg">
                        <p className="px-1 bg-green-500 w-fit rounded-sm text-green-900">
                            status
                        </p>
                        <p className="">aberta</p>
                    </span>
                </div>
            </div>
            <div className="flex px-6 gap-x-8 justify-between mt-2">
                <div className="border-2 border-zinc-300 rounded-lg w-full">
                    <h1 className="p-6 font-bold mb-[-35px]">Notas</h1>
                    <div className="p-6 grid grid-cols-2 gap-8">
                        <InfoInput
                            id="car"
                            type="text"
                            label="Carro"
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
                            requigreen="true"
                            onChange={event =>
                                setServiceOrder({
                                    ...serviceOrder,
                                    contact: event.target.value
                                })
                            }
                        />
                    </div>
                    <span className="block border border-b-green-300 "></span>
                    <div className="p-6 grid grid-cols-3 gap-8 items-center">
                        <div className="col-span-2 ml-[-4px]">
                            <SingleSelect
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
                            className="border-2 px-4 py-2 bg-slate-900 text-sky-200 hover:bg-slate-800 hover:border-sky-200 transition-colors  rounded-md"
                            onClick={() => createOS(serviceOrder.services)}
                        >
                            Create OS
                        </button>
                        <ToastContainer />
                    </div>
                </div>
                <div className="border-2 border-zinc-300 rounded-lg w-full">
                    <h1 className="p-6 font-bold mb-[-35px]">Serviços</h1>
                    <div className="p-6 flex gap-8">
                        <ServiceList onFormSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entrances
