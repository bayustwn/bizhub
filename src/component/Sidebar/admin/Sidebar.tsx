import { useState } from "react";
import ConfirmModal from "../../modal/ConfirmModal";
import SidebarLink from "./SidebarLink";
import { useToken } from "../../../utils/Cookies";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { removeToken } = useToken();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="w-100 border-r-1 border-black/40 font-poppins items-center h-screen bg-white flex flex-col py-10 px-6">
      <img src="/assets/logo.png" className="w-25" alt="logo" />
      <nav className="flex-1 mt-8 flex flex-col gap-2 w-full">
        <SidebarLink
          to="/admin/dashboard"
          text="Dasbor"
          icon="/assets/icons/dashboard.svg"
          iconInactive="/assets/icons/inactive/dashboard.svg"
        />
        <SidebarLink
          to="/admin/semua-tugas"
          text="Semua Tugas"
          icon="/assets/icons/task.svg"
          iconInactive="/assets/icons/inactive/task.svg"
        />
        <SidebarLink
          to="/admin/anggota"
          text="Anggota Tim"
          icon="/assets/icons/user.svg"
          iconInactive="/assets/icons/inactive/user.svg"
          iconSize="w-4"
        />
        <SidebarLink
          to="/admin/performa"
          text="Performa Anggota"
          icon="/assets/icons/perform.svg"
          iconInactive="/assets/icons/inactive/perform.svg"
        />
      </nav>
      <div
        onClick={() => setIsOpen(true)}
        className="hover:px-6 cursor-pointer flex text-primary flex-row items-center bg-primary-200 rounded-lg gap-3 w-full text-black transition-all font-bold text-sm px-4 py-3"
      >
        <img
          src={"/assets/icons/logout.svg"}
          alt="logout"
          className="fill-black"
        />
        <p>Keluar</p>
      </div>
      <ConfirmModal
        confirmText="Logout"
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Yakin Untuk Logout?"
        message="Kamu tetap bisa login kembali setelah logout."
        onConfirm={logout}
      />
    </div>
  );
};

export default Sidebar;
