import React, { useEffect } from "react";
import '../../styles/views/Login.css'
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { BiRevision } from "react-icons/bi";
import { ListHeader } from "../../components";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { user_login } from '../../actions/auth'
import { BASE_URL } from "../../config/api";


function Login(props) {

  const navigate = useNavigate();

  let handleSubmit = () => {
    
    let uname = document.getElementById('Uname').value;
    let pass = document.getElementById('Pass').value;
    let login_info = { username: uname, password: pass }
    props.user_login(login_info).then(() => { }, () => { })
  };
  

  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();

        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);






  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();

        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);







  let clearSubmit = () => {
    document.getElementById('Uname').value = ""
    document.getElementById('Pass').value = ""

  }
  let reloadPage = () => {
    window.location.reload(true);
  }



  useEffect(() => {
    if (props.loginDetails.status === 'success') {
      localStorage.setItem('accessToken', props.loginDetails.token.access)
      // localStorage.setItem('configuration', JSON.stringify(props.loginDetails.configuration)) //[0].current_value
      navigate('/views/hometiles');
      sessionStorage.clear()
    }
  }, [props.loginDetails])

  return (
    <>
      <h2><center>Login Page</center> </h2>
      <br></br>


      <div className="login">
        <form id="login" onSubmit={handleSubmit}>
          <div className="img-click">
            <button className="img-tick" type="button"  onClick={handleSubmit}><BiCheck /></button>
            <button className="img-cancel" type="button" onClick={clearSubmit}><BiX /></button>
            <button className="img-reset" type="button" onClick={reloadPage}><BiRevision /></button>
          </div>
          <div className="full">
            <div className="part1">
              <label className='label'>Username</label>
              <input type="text" name="Uname" id="Uname" placeholder="Username" />
            </div>
            <div className="part2">
              <label className='label'>Password </label>
              <input type="Password" name="Pass" id="Pass" placeholder="Password" />
            </div>
          </div>


          <div className="forgot_password">
            <span><a href="/reset-password">Forgot Password?</a></span>
          </div>



        </form >
      </div >



      {/* <form id="login1" onSubmit={handleSubmit}>
        <div className="auth">
          <div className="Login">
            <div className="part-1">
              <button className="login" onClick={handleSubmit}>Submit</button>
              <button className="cancel">Cancel</button>
              <button className="reset">Reset</button>
            </div>
            <span></span>
            <div className="part-2">
              <div className="username">
                <label>Username</label>
                <input type="text" id="Uname" name="Uname" placeholder="Username"/>
              </div>
              <div className="pass">
                <label>Password</label>
                <input type="password" id="Pass" name="Pass" placeholder="Password"/>
              </div>
            </div>
          </div>
        </div>
      </form> */}


    </>
  );
}

const mapStateToProps = state => {
  return {
    loginDetails: state.authData.loginDetails
  };
};

const mapDispatchToProps = {
  user_login
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);