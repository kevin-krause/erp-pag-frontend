import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    signinStart,
    signinSuccess,
    signinFailure
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
    const user = useSelector(state => state.user)
    const { loading, error } = user
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            dispatch(signinStart())
            const res = await fetch(
                'https://backend-pagani-24fdde363504.herokuapp.com/api/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
            const data = await res.json()
            console.log(data)
            if (data.success === false) {
                dispatch(signinFailure(data.message))
                return
            }
            dispatch(signinSuccess(data))
            navigate('/home')
        } catch (error) {
            dispatch(signinFailure(error.message))
        }
    }
    return (
        <div className="p-6 max-w-lg mx-auto">
            levom
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-slate-100 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading... 😴' : 'Sign in ✨'}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont have an account?</p>
                <Link to={'/sign-up'}>
                    <span className="text-blue-900 hover:underline">
                        Sign up
                    </span>
                </Link>
            </div>
            {error && (
                <p className="text-red-500 mt-5 p-6 bg-red-100 border border-red-300 rounded-lg">
                    {error}
                </p>
            )}
        </div>
    )
}

export default SignIn
