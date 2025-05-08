import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router";
import { CookiesValue } from "../models/cookie";
import Sidebar from "../component/Sidebar/admin/Sidebar";

const PrivateRoute = () => {
  const [cookies] = useCookies<"session", CookiesValue>(["session"]);

  return cookies.session ? (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="h-screen p-10 w-full overflow-auto">
        <Outlet /> 
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
