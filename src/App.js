import './App.css';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { RestrictedRoute } from './routes/RestrictedRoute';
import indexRoutes from "./routes/SecureRoutes";
import Login from './views/authorization/Login';
import { System, Template } from './views'
import ForgotPassword from './views/authorization/ForgotPassword';
import ChangePassword from './views/authorization/ChangePassword';
import FormView from './views/entities/FormView';




function App(props) {
  const params = useParams()

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />} ></Route>

        <Route path="/reset-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ChangePassword />}></Route>
        {/* <Route path="/views" element={<Template />} ></Route> */}
        <Route path="/views/:data_source" element={<Template />} >
          {/* <Route path="/views/:data_source/:form_id/:id" element={<FormView />} /> */}


        </Route>
        {/* <Route path="*" element={alert("Heuy") } /> */}


        {/* {(props.list_data).length = 0 ?
          < Route path={`/views/${props.list_data.data_source}`} element={<Template />} /> : 
          <Route path="/views/:data_source" element={<Template />} />
        } */}



      </Routes>
    </>
  );
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);