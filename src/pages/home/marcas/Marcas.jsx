import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/Axios";
import { MensajeAlerta } from "../../../components";

export const Marcas = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [marcas, setMarcas] = useState([]);
  const [nuevaMarca, setNuevaMarca] = useState({ nombre: "" });

  useEffect(() => {
    obtenerMarcas();
  }, []);

  const obtenerMarcas = async () => {
    try {
      const respuesta = await axiosClient.get("/marcas");
      setMarcas(respuesta.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const marcasState = (e, data) => {
    const { name, value } = data ? data : e.target;

    setNuevaMarca({
      ...nuevaMarca,
      [name]: value,
    });
  };

  const validarInputMarca = () => {
    const { nombre } = nuevaMarca;
    return !nombre.length;
  };

  const guardarMarca = async (e) => {
    e.preventDefault();

    try {
      const { nombre } = nuevaMarca;

      const marcaData = {
        nombre,
      };

      const respuesta = await axiosClient.post("/marcas", marcaData);
      console.log("Marca creada:", respuesta.data);

      obtenerMarcas();

      setMessage({
        text: "Marca creada con éxito",
        type: "success",
      });
    } catch (error) {
      console.log();
      setMessage({
        text: error.response?.data?.message || "Error al crear la marca",
        type: "error",
      });
    }
  };

  const eliminarMarca = async (id) => {
    try {
      const respuesta = await axiosClient.delete(`/marcas/${id}`);
      console.log("Marca eliminada:", respuesta.data);

      obtenerMarcas();

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
            <div className="content">Agregar Nueva Marca</div>
          </h2>
          <form
            className="ui form large stacked segment"
            onSubmit={guardarMarca}
          >
            <div className="field">
              <label>Nombre de la Marca</label>
              <input
                type="text"
                placeholder="Nombre de la Marca"
                name="nombre"
                value={nuevaMarca.nombre}
                onChange={marcasState}
              />
            </div>
            <button
              className="ui button green"
              type="submit"
              disabled={validarInputMarca()}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
      <div className="ui container " style={{ marginTop: "30px" }}>
        <h2>Listado de Marcas</h2>
        <table className="ui celled table ">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.id}</td>
                <td>{marca.nombre}</td>
                <td>
                  <button
                    className="ui button red"
                    onClick={() => eliminarMarca(marca.id)}
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
