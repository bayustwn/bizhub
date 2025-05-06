import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../utils/Cookies";

interface NavbarItems {
  title: string;
  id?: (id: string) => void;
}

function Navbar({ title,id }: NavbarItems) {
  const [name, setName] = useState<string>("");
  const {getToken} = useToken();

  const profile = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/user/profile",{headers : {Authorization : 'Bearer ' + getToken() }})
      .then((res) => {
        setName(res.data.data.nama);
        id?.(res.data.data.id);
      })
  };

  useEffect(() => {profile()},[]);

  return (
    <nav className="flex w-full flex-row items-center justify-between">
      <p className="font-placard text-primary font-bold text-5xl">{title}</p>
      <div className="flex flex-row gap-3">
        <img src="/assets/icons/notification.svg" alt="notification" />
        <p className="font-medium text-lg">{name ? name : "Nama User"}</p>
      </div>
    </nav>
  );
}

export default Navbar;
