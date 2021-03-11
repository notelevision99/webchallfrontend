import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authControl } from "../../components/atom/admin/auth/Login";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            Cookies.get("usrCks") === "Admin" ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/admin/login",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);
export default ProtectedRoute;
