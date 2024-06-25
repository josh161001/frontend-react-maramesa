import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/Axios";
import { MensajeAlerta } from "../../../components";

export const Linea = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [lineas, setLineas] = useState([]);
  const [nuevaLinea, setNuevaLinea] = useState({ nombre: "" });

  useEffect(() => {
    obtenerLinea();
  }, []);

  const obtenerLinea = async () => {
    try {
      const respuesta = await axiosClient.get("/lineas");
      setLineas(respuesta.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const lineaState = (e, data) => {
    const { name, value } = data ? data : e.target;

    setNuevaLinea({
      ...nuevaLinea,
      [name]: value,
    });
  };

  const validarLinea = () => {
    const { nombre } = nuevaLinea;
    return !nombre.length;
  };

  const guardarLinea = async (e) => {
    e.preventDefault();

    try {
      const { nombre } = nuevaLinea;

      const marcaData = {
        nombre,
      };

      const respuesta = await axiosClient.post("/lineas", marcaData);

      obtenerLinea();

      setMessage({
        text: "Linea creada con éxito",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error al crear la linea",
        type: "error",
      });
    }
  };

  const eliminarLinea = async (id) => {
    try {
      const respuesta = await axiosClient.delete(`/lineas/${id}`);
      console.log("Marca eliminada:", respuesta.data);

      obtenerLinea();

      setMessage({
        text: "Marca eliminada con éxito",
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
            <div className="content">Agregar Nueva Linea</div>
          </h2>
          <form
            className="ui form large stacked segment"
            onSubmit={guardarLinea}
          >
            <div className="field">
              <label>Nombre de la linea</label>
              <input
                type="text"
                placeholder="Nombre de la linea"
                name="nombre"
                value={nuevaLinea.nombre}
                onChange={lineaState}
              />
            </div>
            <button
              className="ui button green"
              type="submit"
              disabled={validarLinea()}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
      <div className="ui container " style={{ marginTop: "30px" }}>
        <h2>Listado de Lineas</h2>
        <table className="ui celled table ">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {lineas.map((linea) => (
              <tr key={linea.id}>
                <td>{linea.id}</td>
                <td>{linea.nombre}</td>
                <td>
                  <button
                    className="ui button red"
                    onClick={() => eliminarLinea(linea.id)}
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
