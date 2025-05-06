import { useCookies } from "react-cookie";
import { Outlet,Navigate } from "react-router";
import { CookiesValue } from "../models/cookie";

const AlreadyLogin = () =>{
    const [cookies] = useCookies<'session',CookiesValue>(['session'])

    return (    
        cookies.session? <Navigate to={'/dashboard'} replace /> : <Outlet/> 
    )
}

export default AlreadyLogin;