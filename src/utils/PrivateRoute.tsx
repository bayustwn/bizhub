import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router";
import { CookiesValue } from "../models/cookie";
import Sidebar from "../component/Sidebar/admin/Sidebar";
import { useToken } from "./Cookies";

const PrivateRoute = () => {
  const {getToken} = useToken();
  const token = getToken();
  const posisi = localStorage.getItem("posisi");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (posisi === "admin") {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    );
  }

  const team = posisi === "writer" || posisi === "image" || posisi === "video";

  if (team) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
