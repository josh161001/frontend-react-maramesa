import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import axiosClient from "../../api/Axios";

export const Categorias = () => {
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

      // Limpiar el formulario después de crear la categoría
      setNuevaCategoria({
        nombre: "",
        id_padre: null,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  // Función para construir categorias y subcategorias recursba
  const subcategoriasRecursivas = (categorias) => {
    let opcionDefault = [
      {
        key: "default",
        text: "Selecciona la categoría padre",
        value: "",
        disabled: false, // Opción deshabilitada
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
    <div
      className="ui middle aligned center aligned grid"
      style={{ height: "80vh" }}
    >
      <div className="column" style={{ maxWidth: "450px" }}>
        <h2 className="ui image header">
          <div className="content">Agregar Nueva Categoría</div>
        </h2>
        <Form
          size="large"
          className="ui stacked segment"
          onSubmit={guardarCategoria}
        >
          <Form.Field
            id="form-input-control-categories"
            control={Input}
            name="nombre"
            value={nuevaCategoria.nombre}
            onChange={categoriasState}
            label="Categoría"
            placeholder="Escribe la nueva categoría..."
            required
          />
          <Form.Field
            control={Select}
            name="id_padre"
            value={nuevaCategoria.id_padre}
            onChange={categoriasState}
            label="Categoría padre (si requiere)"
            options={options}
            placeholder="Selecciona la categoría padre"
            search
          />
          <Form.Field
            style={{
              width: "100%",
              justifyContent: "center",
            }}
            id="form-button-control-public"
            control={Button}
            content="Guardar"
            color="green"
            disabled={validarInputCategoria()}
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
};
