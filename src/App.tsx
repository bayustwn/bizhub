import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging  } from "./firebase/fireBaseConfig";

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
import TeamTugas from "./pages/team/tugas/TugasAnggota";
import DetailTugas from "./pages/team/tugas/DetailTugas";
import SemuaTugasAnggota from "./pages/admin/performa/Anggota/semua-tugas/TugasAnggota";
import TugasTerlambat from "./pages/admin/performa/Anggota/terlambat/TugasTerlambat";
import Performa from "./pages/team/performa/Performa";

function App() {

async function requestPermission() {
  const permission = await Notification.requestPermission();

 if (permission === "denied") {
    alert("Notifikasi ditolak. Silakan aktifkan notifikasi di pengaturan browser Anda.");
  }
  
  onMessage(messaging, (payload) => {
      const { title, body } = payload.data || {};
      
      if (Notification.permission === "granted") {
        new Notification(title!, { body});
      }
  });

}

useEffect(() => {
  requestPermission();
}, []);

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
        <Route
          path="performa/anggota/semua-tugas/:bulan/:tahun/:id"
          element={<SemuaTugasAnggota />}
        />
        <Route
          path="performa/anggota/semua-tugas/terlambat/:bulan/:tahun/:id"
          element={<TugasTerlambat />}
        />
        <Route path="semua-tugas" element={<SemuaTugas />} />
        <Route path="semua-tugas/tugas/:id" element={<TugasAnggota />} />
        <Route path="semua-tugas/tugas/edit/:id" element={<EditTugas />} />
        <Route path="semua-tugas/tugas/tambah" element={<TambahTugas />} />
      </Route>

      <Route path="/team" element={<PrivateTeam />}>
        <Route path="dashboard" element={<TeamDashboard />} />
        <Route path="semua-tugas" element={<TeamTugas />} />
        <Route path="semua-tugas/tugas/:id" element={<DetailTugas />} />
        <Route path="performa" element={<Performa />} />
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
