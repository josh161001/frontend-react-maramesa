import { Footer, HeaderRefacciones, SidebarLayout } from "../components";
import { Outlet } from "react-router-dom";
import {} from "../components";

export const RefaccionesLayout = () => {
  return (
    <div>
      {/* <HeaderRefacciones /> */}
      <SidebarLayout />

      {/* <Outlet /> */}
      <Footer />
    </div>
  );
};
