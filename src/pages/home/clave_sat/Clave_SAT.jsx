import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/Axios";
import { MensajeAlerta } from "../../../components";

export const Clave_Sat = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [claves_sat, setClaves_sat] = useState([]);
  const [nuevaClave, setNuevaClave] = useState({ clave: "" });

  useEffect(() => {
    obtenerClave();
  }, []);

  const obtenerClave = async () => {
    try {
      const respuesta = await axiosClient.get("/claves_sat");
      setClaves_sat(respuesta.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const claveState = (e, data) => {
    const { name, value } = data ? data : e.target;

    setNuevaClave({
      ...nuevaClave,
      [name]: value,
    });
  };

  const validarClave = () => {
    const { clave } = nuevaClave;
    return !clave.length;
  };

  const guardarClave = async (e) => {
    e.preventDefault();

    try {
      const { clave } = nuevaClave;

      const marcaData = {
        clave,
      };

      const respuesta = await axiosClient.post("/claves_sat", marcaData);

      obtenerClave();

      setMessage({
        text: "Clave creada con éxito",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error al crear la Clave",
        type: "error",
      });
    }
  };

  const eliminarClave = async (id) => {
    try {
      const respuesta = await axiosClient.delete(`/claves_sat/${id}`);

      obtenerClave();

      setMessage({
        text: "Clave eliminada con éxito",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setMessage({
        text: error.response?.data?.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <MensajeAlerta message={message} setMessage={setMessage} />
      <div
        className="ui middle aligned center aligned grid"
        style={{ height: "80vh" }}
      >
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui image header">
            <div className="content">Agregar Nueva Clave SAT</div>
          </h2>
          <form
            className="ui form large stacked segment"
            onSubmit={guardarClave}
          >
            <div className="field">
              <label>nombre de la Clave Sat</label>
              <input
                type="text"
                placeholder="clave de la clave"
                name="clave"
                value={nuevaClave.clave}
                onChange={claveState}
              />
            </div>
            <button
              className="ui button green"
              type="submit"
              disabled={validarClave()}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
      <div className="ui container " style={{ marginTop: "30px" }}>
        <h2>Listado de claves SAT</h2>
        <table className="ui celled table ">
          <thead>
            <tr>
              <th>No.</th>
              <th>clave</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {claves_sat.map((linea) => (
              <tr key={linea.id}>
                <td>{linea.id}</td>
                <td>{linea.clave}</td>
                <td>
                  <button
                    className="ui button red"
                    onClick={() => eliminarClave(linea.id)}
                  >
                    <i className="trash alternate icon"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
