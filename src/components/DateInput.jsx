/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function DateInput(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mb-2">
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label={props.label}
                        value={props.value ? props.value : null}
                    />
                </DemoContainer>
            </div>
        </LocalizationProvider>
    )
}
