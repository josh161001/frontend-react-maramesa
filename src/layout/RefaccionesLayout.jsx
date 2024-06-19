import { Footer, HeaderRefacciones } from "../components";
import { Outlet } from "react-router-dom";

export const RefaccionesLayout = () => {
  return (
    <div>
      <HeaderRefacciones />
      <div
        className="ui container"
        style={{
          marginTop: "20px",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
