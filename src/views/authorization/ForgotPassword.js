import React from 'react'
import { useState } from 'react'
import { request_reset_email } from '../../actions/auth'
import { connect } from 'react-redux'
import "../../styles/views/Login.css"

const ForgotPassword = (props) => {
  const [email, setEmail] = useState({
    email: "",
  });

  const [status, setStatus] = useState({ password: "" })

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    props.request_reset_email(email).then(() => {

      //ROUTE
    })
    setStatus(props.resetPass.code)
  }


  return (
    <>
      <h2><center>Reset Password</center></h2>
      <br></br>

      <div className="reset-password">
        <form id="reset" onSubmit={handleSubmit} >
          <div className="Rang-Barse">

            <div className="flex-center">
              {status == 200 ?
                <div >
                  <h3 className='Validate'>Password Reset link send. Please check your email!</h3>
                </div> : <></>}
              <label className='label-reset'>Enter your user account's verified email address and we will send you a password reset link.</label>
              <input type="text" name="email" id="email" placeholder="Email" value={email.email} onChange={handleChange} />
              <button className='btn-1' type='submit' >Submit</button>
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

const mapDispatchToProps = {
  request_reset_email
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
