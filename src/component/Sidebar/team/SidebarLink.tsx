import { useState } from "react";
import { Link, useLocation } from "react-router";

interface SidebarLinks {
    to: string; 
    text: string; 
    icon: string;
    iconInactive:string;
    iconSize?: string
  }

function SidebarLink({to,text,icon,iconInactive,iconSize}: SidebarLinks) {

    const location = useLocation();
    const [prefix,setPrefix] = useState<boolean>()
  
    const active = location.pathname === to ? "bg-primary-200 text-primary" : "";

    return (
        <Link
          to={to}
          onMouseEnter={()=>setPrefix(true)}
          onMouseLeave={()=>setPrefix(false)}
          className={`flex flex-row items-center rounded-lg gap-3 w-full text-black transition-all font-bold text-sm px-4 py-3 rounded hover:pl-6 hover:text-primary hover:bg-primary-200 ${active}`}
        >
          {active || prefix? <img src={icon} alt={text} className={`${iconSize} `} />: <img src={iconInactive} alt={text} className={`${iconSize} `} />}
          <p>{text}</p>
        </Link>
    )
}

export default SidebarLink;