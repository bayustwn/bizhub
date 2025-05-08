import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import AlreadyLogin from "./utils/AlreadyLogin";
import Anggota from "./pages/admin/anggota/Anggota";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/anggota" element={<Anggota />} />
      </Route>
      <Route element={<AlreadyLogin/>}>
      <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Home />} path="/" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
