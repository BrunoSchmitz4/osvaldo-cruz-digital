import { Route, Routes } from "react-router";

import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import Sala from "./pages/Sala";
import NaoEncontrado from "./pages/NaoEncontrado";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/escola" element={<Home />} />
      <Route path="/sala/:id" element={<Sala />} />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}
