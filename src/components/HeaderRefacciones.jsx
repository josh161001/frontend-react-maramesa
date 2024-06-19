import { Header, Segment } from "semantic-ui-react";

export const HeaderRefacciones = () => {
  return (
    <div className="ui menu">
      <a href="/" className="item">
        <img
          src="https://www.maramesasystem.com/_img/logo.png"
          style={{
            width: "100px",
            height: "auto",
            margin: "5px",
          }}
        />
      </a>
      <a className="item">
        <i aria-hidden="true" className="users icon"></i>
        Talleres
      </a>
      <a className="item">
        <div>
          Catalogos
          <i
            style={{
              marginLeft: "5px",
            }}
            aria-hidden="true"
            className="dropdown icon"
          ></i>
        </div>
      </a>
      <a className="item">
        <div>
          Reportes
          <i
            style={{
              marginLeft: "5px",
            }}
            aria-hidden="true"
            className="dropdown icon"
          ></i>
        </div>
      </a>
      <a className="item">
        <div>
          Refacciones
          <i
            style={{
              marginLeft: "5px",
            }}
            aria-hidden="true"
            className="dropdown icon"
          ></i>
        </div>
      </a>
      <div className="right menu">
        <div className="ui search item link ">
          <div
            className="ui icon input"
            style={{
              borderRadius: "5px",
            }}
          >
            <input
              type="text"
              autoComplete="off"
              placeholder="Busqueda de talleres..."
              onChange={() => {}}
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </div>
        <div className="item link">
          <i aria-hidden="true" className="bell icon"></i>
        </div>
        <div
          role="listbox"
          aria-expanded="false"
          className="ui left pointing dropwdown link item"
          tabIndex="0"
        >
          <div
            aria-atomic="true"
            aria-live="polite"
            role="alert"
            className="divider text"
          >
            Jorge Michelle Martinez
          </div>
          <i aria-hidden="true" className="dropdown icon"></i>
        </div>
      </div>
    </div>
  );
};
