import React from 'react';
import { Route, Navigate  } from 'react-router-dom';
import { isAuthenticated } from '../config/appSession';
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route accessible evene after login. Like About Us, Contact Us or other footer links
        // restricted = true meaning restricted route can't be accessed after login. like foprgot password, reset etc
        <Route {...rest} render={props => (
            (isAuthenticated() && restricted) ?
                <Navigate  to="/dashboard" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;