import React from 'react';
import { Routes , Route, Navigate  } from 'react-router-dom';
import { isAuthenticated } from '../config/appSession';

export const RestrictedRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route accessible evene after login. Like About Us, Contact Us or other footer links
        // restricted = true meaning restricted route can't be accessed after login. like foprgot password, reset etc
        <Routes>
            <Route {...rest} render={props => (
                <Component {...props} /> 
             )} />
        </Routes>
    );
};