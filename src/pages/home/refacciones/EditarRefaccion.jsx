import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../api/Axios";
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import { MensajeAlerta } from "../../../components";
import { RViewerTrigger, RViewer } from "react-viewerjs";

export const EditarRefaccion = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [imagenEliminar, setImagenEliminar] = useState(null);
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [marca, setMarca] = useState([]);
  const [linea, setLinea] = useState([]);
  const [claveSat, setClaveSat] = useState([]);
  const [refaccion, setRefaccion] = useState({
    id: "",
    modelo: "",
    sku: "",
    cantidad: "",
    id_categoria: "",
    id_marca: "",
    id_linea: "",
    id_clave_sat: "",
    descripcion: "",
    informacion: "",
    herramientas: "",
    sintomas_fallas: "",
    intercambios: "",
    estatus: "",
    position: "",
  });
  const [archivos, setArchivos] = useState([]);
  const [archivosNuevos, setArchivosNuevos] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
    obtenerLineas();
    obtenerClaveSat();
    obtenerRefaccion();
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
    setRefaccion({
      ...refaccion,
      [name]: value,
    });
  };

  const obtenerRefaccion = async () => {
    try {
      const respuesta = await axiosClient.get(`/refacciones/${id}`); // Fixed URL
      setRefaccion(respuesta.data);

      if (respuesta.data.archivos) {
        setArchivos(respuesta.data.archivos);
      }
    } catch (error) {
      setMessage({
        text: "Hubo un error al obtener la refacción",
        type: "error",
      });
    }
  };

  const cambiarTab = (tabNum) => {
    setActiveTab(tabNum);
  };

  const validarRefaccion = () => {
    const {
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
      estatus,
      position,
    } = refaccion;

    return (
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
      !estatus ||
      !position
    );
  };

  const guardarRefaccion = async (e) => {
    e.preventDefault();

    try {
      const {
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
        estatus,
        position,
      } = refaccion;

      const refaccionData = {
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
        estatus,
        position,
      };

      const respuesta = await axiosClient.put(
        `/refacciones/${id}`, // Fixed URL
        refaccionData
      );

      // Actualizar la lista de refacciones
      obtenerRefaccion();

      setMessage({
        text: "Refacción actualizada con éxito",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.error || "Error al actualizar la refacción.",
        type: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    setArchivosNuevos(filesArray);
  };

  const subirNuevoarchivo = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let i = 0; i < archivosNuevos.length; i++) {
        formData.append("url_multimedia[]", archivosNuevos[i]);
      }

      const respuesta = await axiosClient.post(`/archivos/${id}`, formData); // Fixed URL

      setArchivos([...archivos, ...respuesta.data]);

      setMessage({
        text: "Archivo(s) subido(s) con éxito",
        type: "success",
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || "Error al subir el archivo.",
        type: "error",
      });
    }
  };

  // Filtrar imágenes y videos
  const imagenes = archivos.filter((archivo) =>
    archivo.mime_type.startsWith("image")
  );
  const videos = archivos.filter((archivo) =>
    archivo.mime_type.startsWith("video")
  );

  return (
    <div>
      <Modal
        style={{
          height: "auto",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          position: "relative",
        }}
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>
          <Icon name="trash alternate" />
          Eliminar archivo
        </Modal.Header>
        <Modal.Content>
          <p>
            ¿Estás seguro de que deseas eliminar este archivo? Esta acción no se
            puede deshacer.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
              setImagenEliminar(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            negative
            onClick={async () => {
              try {
                if (imagenEliminar) {
                  await axiosClient.delete(`/archivos/${imagenEliminar.id}`); // Fixed URL
                  setMessage({
                    text: "Archivo eliminado con éxito",
                    type: "success",
                  });
                  setOpen(false);
                  setImagenEliminar(null);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              } catch (error) {
                setMessage({
                  text:
                    error.response?.data?.error ||
                    "Error al eliminar el archivo",
                  type: "error",
                });
              }
            }}
          >
            Eliminar
          </Button>
        </Modal.Actions>
      </Modal>

      <MensajeAlerta message={message} setMessage={setMessage} />
      <div className="ui container">
        <h3 className="" style={{ display: "flex", alignItems: "center" }}>
          <Icon
            name="wrench"
            style={{ fontSize: "1.5rem", marginRight: "10px" }}
          />
          Refacciones - {refaccion.modelo}
        </h3>
        <p>
          Refacción registrada el {moment(refaccion.created_at).format("LLL")}
        </p>
        <div>
          <div className="ui attached tabular menu">
            <a
              className={activeTab === 1 ? "active item" : "item"}
              onClick={() => cambiarTab(1)}
            >
              <Icon name="clipboard outline" />
              Información General
            </a>
            <a
              className={activeTab === 2 ? "active item" : "item"}
              onClick={() => cambiarTab(2)}
            >
              <Icon name="images" />
              Galería
            </a>
          </div>
          <div className="ui bottom attached segment">
            {activeTab === 1 && (
              <div>
                <div
                  className="ui segment"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    background: "#4d7198",
                  }}
                >
                  <h4
                    style={{ color: "#fff", margin: "0", fontWeight: "normal" }}
                  >
                    <Icon name="pencil alternate" />
                    Información General
                  </h4>
                </div>
                <Form onSubmit={guardarRefaccion}>
                  <Form.Group widths="equal">
                    <Form.Select
                      fluid
                      name="estatus"
                      label="Estatus"
                      onChange={handleRefaccionChange}
                      value={refaccion.estatus}
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
                      value={refaccion.modelo}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe el modelo..."
                      required
                    />
                    <Form.Input
                      fluid
                      name="sku"
                      value={refaccion.sku}
                      onChange={handleRefaccionChange}
                      label="SKU (Código del producto)"
                      placeholder="Escribe el código..."
                      required
                    />
                    <Form.Input
                      fluid
                      name="cantidad"
                      type="number"
                      value={refaccion.cantidad}
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
                      value={refaccion.id_categoria}
                      options={options}
                      search
                      required
                    />
                    <Form.Select
                      fluid
                      name="id_marca"
                      label="Marca"
                      placeholder="Marca..."
                      value={refaccion.id_marca}
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
                      value={refaccion.id_linea}
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
                      value={refaccion.id_clave_sat}
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
                      value={refaccion.descripcion}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe la descripción..."
                      required
                    />
                    <Form.TextArea
                      name="informacion"
                      label="Información Adicional"
                      value={refaccion.informacion}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe la información adicional..."
                      required
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.TextArea
                      name="herramientas"
                      label="Herramientas"
                      value={refaccion.herramientas}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe las herramientas necesarias..."
                      required
                    />
                    <Form.TextArea
                      name="sintomas_fallas"
                      label="Síntomas o Fallas"
                      value={refaccion.sintomas_fallas}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe los síntomas o fallas..."
                      required
                    />
                    <Form.TextArea
                      name="intercambios"
                      label="Intercambios"
                      value={refaccion.intercambios}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe los intercambios..."
                      required
                    />
                    <Form.TextArea
                      name="position"
                      label="Posición"
                      value={refaccion.position}
                      onChange={handleRefaccionChange}
                      placeholder="Escribe la posicion..."
                      required
                    />
                  </Form.Group>

                  <Button
                    onClick={() => {
                      window.location.href = "/sistema/refacciones";
                    }}
                    className="ui button"
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button className="ui primary button" type="submit">
                    Guardar
                  </Button>
                </Form>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <div
                  className="ui segment"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    background: "#4d7198",
                  }}
                >
                  <h4
                    style={{ color: "#fff", margin: "0", fontWeight: "normal" }}
                  >
                    <Icon name="file image" />
                    Galería
                  </h4>
                </div>
                <Form onSubmit={subirNuevoarchivo}>
                  <Form.Field
                    control={Input}
                    type="file"
                    name="url_multimedia"
                    label="Imágenes o Videos"
                    onChange={handleFileChange}
                    placeholder="Imágenes o Videos"
                    multiple
                    accept="image/*, video/*"
                  />
                  <Button
                    type="submit"
                    className="ui primary button"
                    style={{ marginTop: "10px" }}
                  >
                    Subir
                  </Button>
                </Form>

                <div>
                  <RViewer
                    imageUrls={imagenes.map((imagen) => imagen.url_multimedia)}
                  >
                    <div style={{ marginTop: "20px" }}>
                      <h3>Imágenes:</h3>
                      <div className="ui four column grid">
                        {imagenes.map((imagen, index) => (
                          <div key={index} className="column">
                            <RViewerTrigger index={index}>
                              <img
                                src={`http://localhost:8000${imagen.url_multimedia}`}
                                alt={`Imagen ${index}`}
                                style={{ width: "100%", marginBottom: "10px" }}
                              />
                            </RViewerTrigger>
                            <Button
                              color="red"
                              onClick={() => {
                                setOpen(true);
                                setImagenEliminar(imagen);
                                handleEliminarArchivo(imagen.id);
                              }}
                            >
                              Eliminar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RViewer>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <h3>Videos:</h3>
                  <div className="ui four column grid">
                    {videos.map((video, index) => (
                      <div key={index} className="column">
                        <video
                          controls
                          src={`http://localhost:8000${video.url_multimedia}`}
                          style={{ width: "100%", marginBottom: "10px" }}
                        />
                        <Button
                          color="red"
                          onClick={() => {
                            setOpen(true);
                            setImagenEliminar(video);
                            handleEliminarArchivo(video.id);
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
