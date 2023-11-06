/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ListData = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(props.endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const data = await response.json()
                console.log('Error: ', data.message.message)
                throw new Error(data.message.message)
            }
            const result = await response.json()
            setData(result)
        }

        fetchData()
    }, [])

    function renderData(data) {
        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <tr key={index}>{renderData(item)}</tr>
            ))
        } else if (typeof data === 'object' && data !== null) {
            return Object.entries(data).map(([key, value], index) => (
                <td key={index}>{renderData(value)}</td>
            ))
        } else {
            return data
        }
    }

    return (
        <div className="bg-slate-100 rounded-lg p-6 border-2 border-slate-200 ">
            <h1 className="font-bold p-2 mb-3 bg-slate-200 w-fit rounded-lg text-slate-900">
                {props.title}
            </h1>
            <table>
                <thead>
                    <tr>
                        {Object.keys(data[0] || {}).map((key, index) => (
                            <th key={index}>
                                <p className="text-left border border-b-slate-300 bg-slate-200 p-1 w-full">
                                    {key}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-slate-200 transition-colors"
                        >
                            {Object.values(item).map((value, index) => (
                                <td key={index} className="text-sm text-left ">
                                    <Link to={`${props.baseUrl}/${item._id}`}>
                                        <p className="truncate w-[50px]">
                                            {renderData(value)}
                                        </p>
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListData
