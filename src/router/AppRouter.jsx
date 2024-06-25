import { Route, Routes } from "react-router-dom";
import { Refacciones } from "../pages/home/refacciones/Refacciones";
import { Categorias } from "../pages/home/categorias/Categorias";
import { SidebarLayout } from "../layout/SidebarLayout";
import { EditarRefaccion } from "../pages/home/refacciones/EditarRefaccion";
import { Marcas } from "../pages/home/marcas/Marcas";
import { Linea } from "../pages/home/linea/Linea";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/sistema/" element={<SidebarLayout />}>
          <Route path="refacciones" index element={<Refacciones />} />
          <Route
            path="refacciones/editar-refaccion/:id"
            element={<EditarRefaccion />}
          />
          <Route path="categorias" element={<Categorias />} />
          <Route path="marcas" element={<Marcas />} />
          <Route path="lineas" element={<Linea />} />
        </Route>

        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};
