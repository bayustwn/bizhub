import api from "../../utils/Api";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Loading from "../../component/Loading";
import { useToken } from "../../utils/Cookies";
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase/fireBaseConfig";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLogin] = useState<boolean>(false);
  const { setToken } = useToken();

  const handleLogin = async () => {
    if (email && password) {
      setIsLogin(true);
      await api
        .post("/autentikasi/masuk", {
          email,
          password,
        })
        .then(async (res) => {
          const token = res.data.data.token;
          const jwt: any = jwtDecode(token);
          setToken(token);
          toast.success("Login berhasil!");

          const token_notif = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
          });

          await api.post("/notifikasi/tambah", {
            token: token_notif,
            id_user: jwt.id,
          })

          if (jwt.posisi === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/team/dashboard");
          }
        })
        .catch((err) => {
          toast.error(err.response.data?.message);
        })
        .finally(() => {
          setIsLogin(false);
        });
    } else {
      toast.error("Isi form dengan benar!");
    }
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
          onClick={isLoading ? undefined : handleLogin}
          disabled={isLoading}
          className="bg-primary h-13 flex items-center justify-center text-white rounded-lg hover:cursor-pointer"
        >
          {isLoading ? <Loading /> : "Masuk"}
        </button>
      </div>
    </div>
  );
}

export default Login;
