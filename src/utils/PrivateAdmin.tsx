import { Navigate, Outlet } from "react-router";
import { useToken } from "./Cookies";
import AdminSidebar from "../component/Sidebar/admin/Sidebar";

const PrivateRouteAdmin = () => {
  const { getToken, getPosisi } = useToken();
  const token = getToken();
  const posisi = getPosisi();

  if (!token) return <Navigate to="/login" />;
  if (posisi !== "admin") return <Navigate to="/team/dashboard" />;

  return (
    <div className="flex flex-row h-screen">
      <AdminSidebar />
      <div className="h-screen p-10 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouteAdmin;
