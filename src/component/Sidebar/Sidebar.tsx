import SidebarLink from "./SidebarLink";

const Sidebar = () => {

  return (
    <div className="w-100 border-r-1 border-black/40 font-poppins items-center h-screen bg-white flex flex-col py-10 px-6">
      <img src="/assets/logo.png" className="w-25" alt="logo" />
      <nav className="flex-1 mt-8 flex flex-col gap-2 w-full">
        <SidebarLink to="/dashboard" text="Dasbor" icon="/assets/icons/dashboard.svg" />
        <SidebarLink to="/" text="Tugas Saya" icon="/assets/icons/task.svg" />
      </nav>
      <div
          className="hover:px-6 cursor-pointer flex text-primary flex-row items-center bg-primary-200 rounded-lg gap-3 w-full text-black transition-all font-bold text-sm px-4 py-3"
        >
          <img src={'/assets/icons/logout.svg'} alt="logout" className="fill-black" />
          <p>Keluar</p>
        </div>
    </div>
  );
};

export default Sidebar;
