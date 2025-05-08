import { Link, useLocation } from "react-router";

interface SidebarLinks {
    to: string; 
    text: string; 
    icon: string;
    iconSize?: string
  }

function SidebarLink({to,text,icon,iconSize}: SidebarLinks) {

    const location = useLocation();
  
    const active = location.pathname === to ? "bg-primary-200 text-primary" : "";

    return (
        <Link
          to={to}
          className={`flex flex-row items-center rounded-lg gap-3 w-full text-black transition-all font-bold text-sm px-4 py-3 rounded hover:pl-6 hover:text-primary hover:bg-primary-200 ${active}`}
        >
          <img src={icon} alt={text} className={`fill-black ${iconSize} `} />
          <p>{text}</p>
        </Link>
    )
}

export default SidebarLink;