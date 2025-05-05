import { useCookies } from "react-cookie";
import { Outlet,Navigate } from "react-router";
import { CookiesValue } from "../models/cookie";

const PrivateRoute = () =>{
    const [cookies] = useCookies<'session',CookiesValue>(['session'])

    return (    
        cookies.session? <Outlet/> : <Navigate to={'/login'} replace />
    )
}

export default PrivateRoute;