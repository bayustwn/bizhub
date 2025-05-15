import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import PrivateAdmin from "./utils/PrivateAdmin";
import PrivateTeam from "./utils/PrivateTeam";
import AlreadyLogin from "./utils/AlreadyLogin";
import Anggota from "./pages/admin/anggota/Anggota";
import PerformaBulananAnggota from "./pages/admin/performa/Anggota/Anggota";
import PerformaAnggota from "./pages/admin/performa/PerformaAnggota";
import SemuaTugas from "./pages/admin/tugas/SemuaTugas";
import TugasAnggota from "./pages/admin/tugas/TugasAnggota";
import EditTugas from "./pages/admin/tugas/EditTugas";
import TambahTugas from "./pages/admin/tugas/TambahTugas";

import TeamDashboard from "./pages/team/dashboard/Dashboard";
import TeamTugas from "./pages/team/tugas/tugas";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<PrivateAdmin />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="anggota" element={<Anggota />} />
        <Route path="performa" element={<PerformaAnggota />} />
        <Route
          path="performa/anggota/:id"
          element={<PerformaBulananAnggota />}
        />
        <Route path="semua-tugas" element={<SemuaTugas />} />
        <Route path="semua-tugas/tugas/:id" element={<TugasAnggota />} />
        <Route path="semua-tugas/tugas/edit/:id" element={<EditTugas />} />
        <Route path="semua-tugas/tugas/tambah" element={<TambahTugas />} />
      </Route>

      <Route path="/team" element={<PrivateTeam />}>
        <Route path="dashboard" element={<TeamDashboard />} />
        <Route path="tugas" element={<TeamTugas />} />
      </Route>

      <Route element={<AlreadyLogin />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Home />} path="/" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
