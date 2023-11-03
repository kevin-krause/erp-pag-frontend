// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Entrances from './pages/Entrances'
import Expenses from './pages/Expenses'

import Header from './components/Header'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/entrances" element={<Entrances />}></Route>
                <Route path="/expenses" element={<Expenses />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
