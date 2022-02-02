/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo-full.png"
import ButtonField from '../../components/forms/ButtonField'
import TextInputField from '../../components/forms/TextInputField'
import { authenticate } from '../../features/auth/userSlice'
import { login } from '../../services/utils/auth/auth.controller'

const Login = () => {

    const [staffNo, setStaffNo] = useState("")
    const [password, setPassword] = useState("")

    const naviagate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            staff_no: staffNo,
            password
        }

        try {
            login(data)
            .then(res => {
                dispatch(authenticate(res.data))
                setStaffNo("")
                setPassword("")
                naviagate("/")
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div style={{ height: '100vh' }}>
            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="text-center mb-3">
                                        <a href="index.html"><img src={logo} alt="logo brand" /></a>
                                        </div>
                                        <form onSubmit={handleSubmit}>

                                            <TextInputField 
                                                label="Staff Number"
                                                placeholder="Enter Staff Number"
                                                value={staffNo}
                                                onChange={e => setStaffNo(e.target.value)}
                                                required
                                            />

                                            <TextInputField 
                                                label="Password"
                                                type="password"
                                                placeholder="Enter Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />

                                            <ButtonField 
                                                text="Sign Me In"
                                                type="submit"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
