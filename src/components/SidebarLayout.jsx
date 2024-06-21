import React, { useState, useEffect } from "react";
import { Header } from "semantic-ui-react";
import "./css/components.css";
import { HeaderRefacciones } from "./HeaderRefacciones";
import { Outlet } from "react-router-dom";

export const SidebarLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);

    // agrega la clase active al body
    if (sidebarExpanded) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  };
  // Estado para manejar la visibilidad de los dropdowns y sus iconos
  const [dropdowns, setDropdowns] = useState({
    catalogo: false,
    reportes: false,
    refacciones: false,
  });

  // funcion para alternar la visibilidad de los dropdowns
  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdownName]: !prevDropdowns[dropdownName],
    }));
  };

  return (
    <div className={`wrapper`}>
      <div className={`wrapper__sidebar`}>
        <div className="wrapper__sidebar__logo">
          <img src="https://www.maramesasystem.com/_img/logo.png" alt="Logo" />
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
              className={`angle double ${
                sidebarExpanded ? "left" : "right"
              } icon`}
              style={{ color: "#586075" }}
            ></i>
          </button>
        </div>
        <div
          className="wrapper__sidebar__menu"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 60px)",
          }}
        >
          <ul>
            <li>
              <a href="#">
                <i className="chart bar outline icon"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <p
              style={{
                color: "#586075",
                fontSize: "12px",
                margin: "5px 0 5px 0",
                fontWeight: "bold",
              }}
            >
              MODULOS
            </p>
            <li>
              <a href="#">
                <i className="users icon"></i>
                <span>Talleres</span>
              </a>
            </li>
            {/* Dropdown para Catálogo */}
            <li className={`dropdown-item ${dropdowns.catalogo ? "open" : ""}`}>
              <a href="#" onClick={() => toggleDropdown("catalogo")}>
                <i className="clipboard list icon"></i>
                <span>Catálogo</span>
                <i
                  className={`dropdown-icon ${
                    dropdowns.catalogo ? "open" : ""
                  }`}
                >
                  <i
                    className={
                      dropdowns.catalogo ? "angle up icon" : "angle down icon"
                    }
                  ></i>
                </i>
              </a>
              {dropdowns.catalogo && (
                <ul className="submenu">
                  <li>
                    <a href="#">Opción 1</a>
                  </li>
                  <li>
                    <a href="#">Opción 2</a>
                  </li>
                </ul>
              )}
            </li>
            {/* Dropdown para Reportes */}
            <li className={`dropdown-item ${dropdowns.reportes ? "open" : ""}`}>
              <a href="#" onClick={() => toggleDropdown("reportes")}>
                <i className="clipboard check icon"></i>
                <span>Reportes</span>
                <i
                  className={`dropdown-icon ${
                    dropdowns.reportes ? "open" : ""
                  }`}
                >
                  <i
                    className={
                      dropdowns.reportes ? "angle up icon" : "angle down icon"
                    }
                  ></i>
                </i>
              </a>
              {dropdowns.reportes && (
                <ul className="submenu">
                  <li>
                    <a href="#">Reporte 1</a>
                  </li>
                  <li>
                    <a href="#">Reporte 2</a>
                  </li>
                </ul>
              )}
            </li>
            {/* Dropdown para Refacciones */}
            <li
              className={`dropdown-item ${dropdowns.refacciones ? "open" : ""}`}
            >
              <a href="#" onClick={() => toggleDropdown("refacciones")}>
                <i className="wrench icon"></i>
                <span>Refacciones</span>
                <i
                  className={`dropdown-icon ${
                    dropdowns.refacciones ? "open" : ""
                  }`}
                >
                  <i
                    className={
                      dropdowns.refacciones
                        ? "angle up icon"
                        : "angle down icon"
                    }
                  ></i>
                </i>
              </a>
              {dropdowns.refacciones && (
                <ul className="submenu">
                  <li>
                    <a href="#">Refacción 1</a>
                  </li>
                  <li>
                    <a href="#">Refacción 2</a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Aqui va el contenido principal */}
      <div className="wrapper__section">
        {/* header princpal */}
        <HeaderRefacciones
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div
          style={{
            padding: "1.4rem",
          }}
        >
          {/* contenido  */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
