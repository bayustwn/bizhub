import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
