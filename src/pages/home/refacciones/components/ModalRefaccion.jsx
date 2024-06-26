import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import axiosClient from "../../../../api/Axios";
import { MensajeAlerta } from "../../../../components";

export const ModalRefaccion = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [marca, setMarca] = useState([]);
  const [linea, setLinea] = useState([]);
  const [claveSat, setClaveSat] = useState([]);
  const [nuevaRefaccion, setNuevaRefaccion] = useState({
    estatus: "",
    modelo: "",
    sku: "",
    cantidad: 0,
    id_categoria: "",
    id_marca: "",
    id_linea: "",
    id_clave_sat: "",
    descripcion: "",
    informacion: "",
    herramientas: "",
    sintomas_fallas: "",
    intercambios: "",
    position: "",
    url_multimedia: [],
  });

  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
    obtenerLineas();
    obtenerClaveSat();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const respuesta = await axiosClient.get("/categorias");
      setCategorias(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setMessage({
        text:
          error.response?.data?.message || "Error al obtener las categorías.",
        type: "error",
      });
    }
  };

  const obtenerMarcas = async () => {
    try {
      const respuesta = await axiosClient.get("/marcas");
      setMarca(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
      setMessage({
        text: error.response?.data?.message || "Error al obtener las marcas.",
        type: "error",
      });
    }
  };

  const obtenerLineas = async () => {
    try {
      const respuesta = await axiosClient.get("/lineas");
      setLinea(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las líneas:", error);
      setMessage({
        text: error.response?.data?.message || "Error al obtener las líneas.",
        type: "error",
      });
    }
  };

  const obtenerClaveSat = async () => {
    try {
      const respuesta = await axiosClient.get("/claves_sat");
      setClaveSat(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las claves SAT:", error);
      setMessage({
        text:
          error.response?.data?.message || "Error al obtener las claves SAT.",
        type: "error",
      });
    }
  };

  const subcategoriasRecursivas = (categorias) => {
    let opcionesDefault = [
      {
        key: "default",
        text: "Selecciona la categoría padre",
        value: "",
        disabled: false,
      },
    ];

    const opcionesCategorias = (categorias) => {
      categorias.forEach((categoria) => {
        opcionesDefault.push({
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
    return opcionesDefault;
  };

  const options = subcategoriasRecursivas(categorias);

  const handleRefaccionChange = (e, { name, value }) => {
    setNuevaRefaccion({
      ...nuevaRefaccion,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setNuevaRefaccion({
      ...nuevaRefaccion,
      url_multimedia: filesArray,
    });
  };

  const validarRefaccion = () => {
    const {
      estatus,
      modelo,
      sku,
      cantidad,
      id_categoria,
      id_marca,
      id_linea,
      id_clave_sat,
      descripcion,
      informacion,
      herramientas,
      sintomas_fallas,
      intercambios,
      position,
    } = nuevaRefaccion;

    return (
      !estatus ||
      !modelo ||
      !sku ||
      !cantidad ||
      !id_categoria ||
      !id_marca ||
      !id_linea ||
      !id_clave_sat ||
      !descripcion ||
      !informacion ||
      !herramientas ||
      !sintomas_fallas ||
      !intercambios ||
      !position
    );
  };
  const guardarRefaccion = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("estatus", nuevaRefaccion.estatus);
      formData.append("modelo", nuevaRefaccion.modelo);
      formData.append("sku", nuevaRefaccion.sku);
      formData.append("cantidad", nuevaRefaccion.cantidad);
      formData.append("id_categoria", nuevaRefaccion.id_categoria);
      formData.append("id_marca", nuevaRefaccion.id_marca);
      formData.append("id_linea", nuevaRefaccion.id_linea);
      formData.append("id_clave_sat", nuevaRefaccion.id_clave_sat);
      formData.append("descripcion", nuevaRefaccion.descripcion);
      formData.append("informacion", nuevaRefaccion.informacion);
      formData.append("herramientas", nuevaRefaccion.herramientas);
      formData.append("sintomas_fallas", nuevaRefaccion.sintomas_fallas);
      formData.append("intercambios", nuevaRefaccion.intercambios);
      formData.append("position", nuevaRefaccion.position);

      // Agregar archivos multimedia a formData
      for (let i = 0; i < nuevaRefaccion.url_multimedia.length; i++) {
        formData.append("url_multimedia[]", nuevaRefaccion.url_multimedia[i]);
      }

      const respuesta = await axiosClient.post("/refacciones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(respuesta);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 3000);

      setMessage({ text: "Refacción creada con éxito", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error al crear la refacción.",
        type: "error",
      });
    }
  };

  return (
    <div>
      <MensajeAlerta message={message} setMessage={setMessage} />
      <Modal
        style={{
          height: "auto",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          position: "relative",
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          <Button className="ui right floated button icon left labeled teal">
            <i className="plus icon"></i>
            Registrar
          </Button>
        }
      >
        <ModalHeader>Registrar Refacción</ModalHeader>
        <ModalContent>
          <Form onSubmit={guardarRefaccion}>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                name="estatus"
                label="Estatus"
                placeholder="Estatus..."
                onChange={handleRefaccionChange}
                options={[
                  { key: 1, text: "Activo", value: 1 },
                  { key: 0, text: "Inactivo", value: 0 },
                ]}
                required
              />
              <Form.Input
                fluid
                name="modelo"
                label="Modelo"
                onChange={handleRefaccionChange}
                placeholder="Escribe el modelo..."
                required
              />
              <Form.Input
                fluid
                name="sku"
                onChange={handleRefaccionChange}
                label="SKU (Codigo del producto)"
                placeholder="Escribe el codigo..."
                required
              />
              <Form.Input
                fluid
                name="cantidad"
                type="number"
                onChange={handleRefaccionChange}
                label="Cantidad"
                placeholder="Escribe la cantidad..."
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                name="id_categoria"
                label="Categoría"
                placeholder="Categoría..."
                onChange={handleRefaccionChange}
                options={options}
                search
                required
              />
              <Form.Select
                fluid
                name="id_marca"
                label="Marca"
                placeholder="Marca..."
                onChange={handleRefaccionChange}
                options={
                  marca &&
                  marca.map((marca) => ({
                    key: marca.id,
                    text: marca.nombre,
                    value: marca.id,
                  }))
                }
                search
                required
              />
              <Form.Select
                fluid
                name="id_linea"
                label="Línea"
                placeholder="Línea..."
                onChange={handleRefaccionChange}
                options={
                  linea &&
                  linea.map((linea) => ({
                    key: linea.id,
                    text: linea.nombre,
                    value: linea.id,
                  }))
                }
                search
                required
              />
              <Form.Select
                fluid
                name="id_clave_sat"
                label="Clave SAT"
                placeholder="Clave SAT..."
                onChange={handleRefaccionChange}
                options={
                  claveSat &&
                  claveSat.map((claveSat) => ({
                    key: claveSat.id,
                    text: claveSat.clave,
                    value: claveSat.id,
                  }))
                }
                search
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                name="descripcion"
                label="Descripción"
                onChange={handleRefaccionChange}
                placeholder="Escribe la descripción..."
                required
              />
              <Form.TextArea
                name="informacion"
                label="Información Adicional"
                onChange={handleRefaccionChange}
                placeholder="Escribe la información adicional..."
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                name="herramientas"
                label="Herramientas"
                onChange={handleRefaccionChange}
                placeholder="Escribe las herramientas necesarias..."
                required
              />
              <Form.TextArea
                name="sintomas_fallas"
                label="Síntomas o Fallas"
                onChange={handleRefaccionChange}
                placeholder="Escribe los síntomas o fallas..."
                required
              />
              <Form.TextArea
                name="intercambios"
                label="Intercambios"
                onChange={handleRefaccionChange}
                placeholder="Escribe los intercambios..."
                required
              />{" "}
              <Form.TextArea
                name="position"
                label="Posición"
                onChange={handleRefaccionChange}
                placeholder="Escribe la posicion..."
                required
              />
            </Form.Group>
            <FormField
              control={Input}
              type="file"
              name="url_multimedia"
              onChange={handleFileChange}
              label="Imágenes o Videos"
              placeholder="Imágenes o Videos"
              multiple
              accept="image/*, video/*"
            />
            <ModalActions>
              <Button color="black" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                content="Registrar"
                labelPosition="left"
                icon="checkmark"
                positive
                type="submit"
                disabled={validarRefaccion()}
              />
            </ModalActions>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  );
};
