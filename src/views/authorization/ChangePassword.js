import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { HEADERS } from '../../config/appHeaders';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function ChangePassword() {


    const navigate = useNavigate();
    const token = useParams()
    const [password, setPassword] = useState({ password: "" })
    const [confirmPassword, setConfirmPassword] = useState({ password: "" })
    const [status, setStatus] = useState({})



    const handleSubmit = (e) => {
        e.preventDefault()
        if (password.password == confirmPassword.password) {
            let data = {
                password: password.password,
                confirm_password: confirmPassword.password
            }
            async function Data() {
                let dataVar = await axios.post(`${BASE_URL}/users/reset-password/${token.token}/`, data, { headers: HEADERS.AUTHENTIC() })
                setStatus(dataVar.status)
            }
            Data()
        }
    }

    const setTime = async () => {

        setInterval(() => {
            navigate('/login');
        }, 5000)

    }

    const handleChangePassword = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword({ ...confirmPassword, [e.target.name]: e.target.value })
    }
    return (
        <>


            <h2><center>Change Password</center></h2>
            <br></br>

            <div className="reset-password">
                <form id="reset" onSubmit={handleSubmit}>
                    <div className="Rang-Barse">

                        <div className="flex-center">
                            {status == 200 ?
                                <div >
                                    <h3 className='Validate'>Password Change Successfully</h3>
                                    {setTime}
                                </div> : <></>}
                            <label className='label-reset'>Enter your user account's verified email address and we will send you a password reset link.</label>
                            <input type="password" name="password" id="password" placeholder="Password" value={password.password} onChange={handleChangePassword} />
                            <input type="password" name="password" id="password" placeholder="Confirm Password" value={confirmPassword.password} onChange={handleChangeConfirmPassword} />
                            {password.password !== confirmPassword.password ?
                                <div className='Validate'>
                                    <h3>Both passwords must be same</h3>
                                </div> : <></>}
                            <button className='btn-1' type='submit'>Submit</button>

                        </div>
                    </div>


                </form>
            </div>
        </>
    )









}

const mapStateToProps = state => {
    return {
        resetPass: state.authData.resetPass
    };
};

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)