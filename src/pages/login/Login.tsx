import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CookiesValue } from "../../models/cookie";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies<"session", CookiesValue>([
    "session",
  ]);
  
  const handleLogin = async () => {

    await axios
      .post(import.meta.env.VITE_BASE_URL + "/auth/login", { email, password })
      .then((res) => {
        setCookie("session", res.data.data.token);
        navigate('/dashboard');
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      });
  };

  return (
    <div className="justify-center font-poppins flex items-center h-screen w-screen">
      <div className="flex flex-col gap-3 w-1/4">
        <p className="self-start font-placard font-bold text-5xl">Masuk.</p>
        <p className="font-md">Isi Identitas Anda untuk masuk.</p>
        <div className="w-2/3 flex justify-end items-center relative w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="border-black outline-none border-3 pl-12 text-md rounded-lg p-3 w-full"
          />
          <img
            src="/assets/icons/email.svg"
            className="absolute left-0 ml-5 w-5"
            alt="user"
          />
        </div>
        <div className="w-2/3 flex justify-end items-center relative w-full">
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="border-black outline-none border-3 pl-12 text-md rounded-lg p-3 w-full"
          />
          <img
            src="/assets/icons/pass.svg"
            className="absolute left-0 ml-5 w-4"
            alt="password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-primary text-white py-3 rounded-lg hover:cursor-pointer"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}

export default Login;
