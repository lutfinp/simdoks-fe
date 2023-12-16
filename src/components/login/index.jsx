'use client';

import React from "react";
import FormLogin from "./formLogin";
import { useState } from "react";
const Login = () => {
    const [userData, setUserData] = useState(null);
    const handleLogin = (data) => {
        setUserData(data);
        window.location.href ="./dashboard"
    }
    return (
        <>
            <FormLogin/>
        </>
    )
}
export default Login