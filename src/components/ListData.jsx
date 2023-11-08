/* eslint-disable react/prop-types */
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
                const errorData = await response.json()
                console.log('Error: ', errorData.message.message)
                throw new Error(errorData.message.message)
            }
            const result = await response.json()
            setData(result)
        }

        fetchData()
    }, [props.endpoint])

    function renderData(data) {
        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <tr key={index}>{renderData(item)}</tr>
            ))
        } else if (typeof data === 'object' && data !== null) {
            return props.visibleColumns.map((column, index) => (
                <td key={index}>{renderData(item[column.name])}</td>
            ))
        } else {
            return data
        }
    }

    const styles = {
        red: 'font-normal p-2 mb-3 bg-red-600 w-fit rounded-lg text-zinc-100 opacity-100 shadow-sm',
        blue: 'font-normal p-2 mb-3 bg-blue-900 w-fit rounded-lg text-sky-100 opacity-100 shadow-sm',
        green: 'font-normal p-2 mb-3 bg-green-500 w-fit rounded-lg text-white opacity-80 shadow-sm',
        yellow: 'font-normal p-2 mb-3 bg-yellow-400 w-fit rounded-lg text-yellow-900 opacity-100 shadow-sm'
    }

    const defaultStyle = styles.blue
    const selectedStyle = styles[props.titleStyle] || defaultStyle

    return (
        <div className="bg-zinc-100 rounded-lg p-6 w-full">
            <h1 className={selectedStyle}>{props.title}</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        {props.visibleColumns.map((column, index) => (
                            <th key={index}>
                                <p className="text-left font-normal  border-b border-b-slate-400 bg-slate-100  p-1 w-full">
                                    {column.alias}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                            {props.visibleColumns.map((column, index) => (
                                <td key={index} className="text-sm text-left ">
                                    <p className="truncate w-[70px] m-2">
                                        <Link
                                            to={`../${props.baseUrl}/${item._id}`}
                                        >
                                            {renderData(item[column.name])}
                                        </Link>
                                    </p>
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
