import { useState } from "react";
import { Route, Routes } from "react-router";

import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import Sala from "./pages/Sala";
import Fim from "./pages/Fim";
import NaoEncontrado from "./pages/NaoEncontrado";
import Player from "./components/Player";

export default function AppRoutes() {
  const [musica, setMusica] = useState(null);
  const [vez, setVez] = useState(0);

  function tocar(novaMusica) {
    setMusica(novaMusica);
    setVez(vez + 1);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/escola" element={<Home musica={musica} tocar={tocar} />} />
        <Route path="/sala/:id" element={<Sala />} />
        <Route path="/fim" element={<Fim />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>

      {musica && <Player key={vez} musica={musica} parar={() => setMusica(null)} />}
    </>
  );
}
