/* eslint-disable react/prop-types */
import React from 'react'
import TextField from '@mui/material/TextField'

export default function InfoInput(props) {
    const { req, id, type, label, value, onChange } = props

    if (req === 'true') {
        return (
            <TextField
                required
                id={id}
                type={type}
                label={label}
                value={value}
                onChange={onChange}
            />
        )
    } else {
        return (
            <TextField
                id={id}
                type={type}
                label={label}
                value={value}
                onChange={onChange}
            />
        )
    }
}
