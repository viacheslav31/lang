import React from 'react';
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
    // TODO setToken in user table with timeout (get token in success login)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return <DefaultLayout>{children}</DefaultLayout>;
    } else {
        window.location.href = "/login";
    }
}

export default ProtectedRoute;
