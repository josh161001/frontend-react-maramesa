import { Route, Routes } from "react-router-dom";
import { Refacciones } from "../pages/refacciones/Refacciones";
import { Categorias } from "../pages/categorias/Categorias";
import { SidebarLayout } from "../layout/SidebarLayout";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/sistema/" element={<SidebarLayout />}>
          <Route path="refacciones" index element={<Refacciones />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>

        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};
