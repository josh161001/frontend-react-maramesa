import React from "react";
import "./css/components.css";

export const HeaderRefacciones = ({ sidebarExpanded, toggleSidebar }) => {
  // const menuItem = [
  //   {
  //     name: "dashboad",
  //     link: "/dashboard",
  //     subMenu: [{}],

  //     name: "Modulos",
  //     link: "",
  //     subMenu: [
  //       {
  //         name: "Talleres",
  //         link: "/talleres",
  //       },
  //       {
  //         name: "Catalogo",
  //         link: "",
  //         subMenu: [
  //           {
  //             name: "Catalogo 1",
  //             link: "/catalogo1",
  //           },
  //           {
  //             name: "Catalogo 2",
  //             link: "/catalogo2",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Reportes",
  //         link: "",
  //         subMenu: [
  //           {
  //             name: "Reporte 1",
  //             link: "/reporte1",
  //           },
  //           {
  //             name: "Reporte 2",
  //             link: "/reporte2",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Refacciones",
  //         link: "",
  //         subMenu: [
  //           {
  //             name: "Refaccion 1",
  //             link: "/refaccion1",
  //           },
  //           {
  //             name: "Refaccion 2",
  //             link: "/refaccion2",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]; por trabajar en un map mas automatico
  return (
    <div className="ui menu">
      {!sidebarExpanded && (
        <>
          <div className="item">
            <button
              className="sidebar__toggle"
              onClick={toggleSidebar}
              style={{
                border: "none",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
                backgroundColor: "#333F57",
                padding: "0.3rem",
                borderRadius: "5px",
              }}
            >
              <i
                className="angle double right icon"
                style={{ color: "#586075" }}
              ></i>
            </button>
          </div>
          <div className="item link">
            <img
              src="https://www.maramesasystem.com/_img/logo.png"
              alt="Logo"
              style={{ width: "120px" }}
            />
          </div>
        </>
      )}

      {/* <div className="item link">Dashboard</div>

      <div>
        <div class="ui item link ">
          <div role="listbox" class="ui simple dropdown item link" tabindex="0">
            Modulos
            <i aria-hidden="true" class="dropdown icon"></i>
            <div class="menu transition">
              <div role="option" class="item">
                Talleres
              </div>
              <div role="option" class="item">
                <i aria-hidden="true" class="dropdown icon"></i>
                <span class="text">Catalogo</span>
                <div class="menu transition">
                  <div role="option" class="item">
                    Catalago 1
                  </div>
                  <div role="option" class="item">
                    Catalogo 2
                  </div>
                </div>
              </div>
              <div role="option" class="item">
                <i aria-hidden="true" class="dropdown icon"></i>
                <span class="text">Reportes</span>
                <div class="menu transition">
                  <div role="option" class="item">
                    Reporte 1
                  </div>
                  <div role="option" class="item">
                    Reporte 2
                  </div>
                </div>
              </div>
              <div role="option" class="item">
                <i aria-hidden="true" class="dropdown icon"></i>
                <span class="text">Refacciones</span>
                <div class="menu transition">
                  <div role="option" class="item">
                    Refaccion 1
                  </div>
                  <div role="option" class="item">
                    Refaccion 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="right menu"
        style={{
          padding: ".5rem",
        }}
      >
        {/* <div className="ui search item link">
          <div className="ui icon input" style={{ borderRadius: "5px" }}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Búsqueda de talleres..."
              onChange={() => {}}
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </div> */}
        <div className="item link">
          <i aria-hidden="true" className="bell icon"></i>
        </div>
        <div className="ui left pointing dropdown link item">
          {/* <div className="divider text" role="alert">
            Jorge Michelle Martinez
          </div> */}
          <i class="user circle icon"></i>{" "}
        </div>
      </div>
    </div>
  );
};
