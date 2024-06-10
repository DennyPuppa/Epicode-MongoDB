import React, { useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const useSession = () => {

    const session = JSON.parse(localStorage.getItem('token'))
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate();

    useEffect(() => {
        if(!session){
            navigate('/login')
        }
    }, [navigate, session])

    return {decodedSession, session};
}

export default useSession
