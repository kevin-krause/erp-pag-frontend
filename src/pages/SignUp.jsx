import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            const res = await fetch(
                'https://backend-pagani-24fdde363504.herokuapp.com/api/auth/signup',
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
                setLoading(false)
                setError(data.message)
                return
            }
            setLoading(false)
            setError(null)
            navigate('/sign-in')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }
    return (
        <div className="px-6 mt-4 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
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
                    className="bg-slate-900 transition-colors text-slate-100 p-3 rounded-lg hover:bg-purple-900    disabled:opacity-80"
                >
                    {loading ? 'Loading... 😴' : 'Sign up 🫂'}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p className="text-zinc-400">Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className="text-blue-900 hover:underline">
                        Sign in
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

export default SignUp
