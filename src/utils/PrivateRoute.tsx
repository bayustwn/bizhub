import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router";
import { CookiesValue } from "../models/cookie";
import AdminSidebar from "../component/Sidebar/admin/Sidebar";
import TeamSidebar from "../component/Sidebar/team/Sidebar";
import { useToken } from "./Cookies";

const PrivateRoute = () => {
  const {getToken, getPosisi}  = useToken();
  const token = getToken();
  const posisi = getPosisi();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (posisi === "admin") {
    return (
      <div className="flex">
        <AdminSidebar />
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
        <TeamSidebar />
        <div className="w-full h-screen overflow-y-auto bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
