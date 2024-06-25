import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import axiosClient from "../../../api/Axios";
import { MensajeAlerta } from "../../../components";

export const Categorias = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    id_padre: null,
  });

  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Obtener categorias desde la API
  const obtenerCategorias = async () => {
    try {
      const respuesta = await axiosClient.get("/categorias");
      setCategorias(respuesta.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  //guardar categorias en el state
  const categoriasState = (e, data) => {
    const { name, value } = data ? data : e.target;

    setNuevaCategoria({
      ...nuevaCategoria,
      [name]: value,
    });
  };

  const validarInputCategoria = () => {
    const { nombre } = nuevaCategoria;
    return !nombre.length;
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    try {
      const { nombre, id_padre } = nuevaCategoria;

      const categoriaData = {
        nombre,
        id_padre,
      };

      const respuesta = await axiosClient.post("/categorias", categoriaData);
      console.log("Categoría creada:", respuesta.data);

      // Actualizar la lista de categorías mostradas
      obtenerCategorias();

      // Mostrar mensaje de éxito
      setMessage({
        text: "Categoría creada con éxito",
        type: "success",
      });

      // Limpiar el formulario después de crear la categoría
      setNuevaCategoria({
        nombre: "",
        id_padre: null,
      });
    } catch (error) {
      console.log(error.response.data.error);
      setMessage({
        text: error.response?.data?.error || "Error al crear la categoría.",
        type: "error",
      });
    }
  };

  // Función para construir categorias y subcategorias recursba
  const subcategoriasRecursivas = (categorias) => {
    let opcionDefault = [
      {
        key: "default",
        text: "Selecciona la categoría padre",
        value: "",
        disabled: false,
      },
    ];

    const opcionesCategorias = (categorias) => {
      categorias.forEach((categoria) => {
        opcionDefault.push({
          key: categoria.id,
          text: categoria.nombre,
          value: categoria.id,
        });

        if (categoria.subcategorias && categoria.subcategorias.length > 0) {
          opcionesCategorias(categoria.subcategorias);
        }
      });
    };

    opcionesCategorias(categorias);
    return opcionDefault;
  };

  // Arreglo de opcionDefault para el Select de categorías y subcategorías
  const options = subcategoriasRecursivas(categorias);

  return (
    <div>
      <MensajeAlerta message={message} setMessage={setMessage} />
      <div
        className="ui middle aligned center aligned grid"
        style={{ height: "80vh" }}
      >
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui image header">
            <div className="content">Agregar Nueva Categoría</div>
          </h2>

          <form className="ui form large stacked segment">
            <div className="field">
              <label>Nombre de la categoría</label>
              <input
                type="text"
                name="nombre"
                value={nuevaCategoria.nombre}
                onChange={categoriasState}
                placeholder="Nombre de la categoría"
              />
            </div>
            <div className="field">
              <label>Categoría padre (si requiere)</label>
              <div></div>
              <Select
                name="id_padre"
                value={nuevaCategoria.id_padre}
                onChange={categoriasState}
                options={options}
                placeholder="Selecciona la categoría padre"
                search
              />
            </div>
            <button
              className="ui button green"
              type="submit"
              onClick={guardarCategoria}
              disabled={validarInputCategoria()}
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
