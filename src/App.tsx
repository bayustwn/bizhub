import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./utils/PrivateRoute";
import AlreadyLogin from "./utils/AlreadyLogin";
import Anggota from "./pages/admin/anggota/Anggota";
import PerformaBulananAnggota from "./pages/admin/performa/Anggota/Anggota";
import PerformaAnggota from "./pages/admin/performa/PerformaAnggota";
import SemuaTugas from "./pages/admin/tugas/SemuaTugas";

import TeamDashboard from "./pages/team/dashboard/Dashboard";
import TeamTugas from "./pages/team/tugas/tugas";
//import DetailTugas from "./pages/team/tugas/detailTugas";
//import TeamPerforma from "./pages/team/performa/performa";

function App() {
  return (
    
    <Routes>
      {/* route admin */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/anggota" element={<Anggota />} />
        <Route path="/admin/performa" element={<PerformaAnggota/>}/>
        <Route path="/admin/performa/anggota/:id" element={<PerformaBulananAnggota/>} />
        <Route path="/admin/semua-tugas" element={<SemuaTugas/>} />
      

      {/* route team */}
        <Route path="/team/dashboard" element={<TeamDashboard />} />
        <Route path="/team/tugas" element={<TeamTugas />} />
        {/*<Route path="/team/tugas/:id" element={<DetailTugas />} />
        <Route path="/team/performa" element={<TeamPerforma />} />*/}

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
