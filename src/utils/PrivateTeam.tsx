import { Navigate, Outlet } from "react-router";
import { useToken } from "./Cookies";
import TeamSidebar from "../component/Sidebar/team/Sidebar";

const PrivateRouteTeam = () => {
  const { getToken, getPosisi } = useToken();
  const token = getToken();
  const posisi = getPosisi();

  if (!token) return <Navigate to="/login" />;
  if (posisi === "admin") return <Navigate to="/admin/dashboard" />;

  return (
    <div className="flex flex-row h-screen">
      <TeamSidebar />
      <div className="h-screen p-10 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouteTeam;
