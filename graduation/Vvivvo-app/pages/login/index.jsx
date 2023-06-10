import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";

const Index = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
    }, [msg]);

    const LoginFunc = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h1> LoginComponent</h1>
            <form onSubmit={LoginFunc}>
                <label htmlFor="id"> ID : </label>
                <input type="text" id="id" />
                <br />
                <label htmlFor="password"> Password : </label>
                <input type="password" />
                <br />
                <button type="submit">로그인</button>
                <br />
                {msg}
            </form>
        </>
    )
}

export default Index;
