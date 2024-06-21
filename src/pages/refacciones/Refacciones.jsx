import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import axiosClient from "../../api/Axios";
import { MensajeAlerta } from "../../components";
import { CargarExcelRefacciones, ModalRefaccion } from "./components";
import $ from "jquery";
import "datatables.net";
// import "https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css";

export const Refacciones = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
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
    url_multimedia: [],
  });

  const dataTableRef = useRef();
  const [dataTableInit, setDataTableInit] = useState(false);

  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
    obtenerLineas();
    obtenerClaveSat();
  }, []);

  useEffect(() => {
    if (!dataTableInit) {
      initDataTable();
      setDataTableInit(true);
    }

    return () => {
      if ($.fn.DataTable.isDataTable("#datatable_refacciones")) {
        dataTableRef.current.destroy();
        setDataTableInit(false);
      }
    };
  }, [categorias]);

  const refaccionesState = (e, data) => {
    const { name, value } = data ? data : e.target;
    setNuevaRefaccion({
      ...nuevaRefaccion,
      [name]: value,
    });
  };

  const guardarRefaccion = async (e) => {
    e.preventDefault();

    try {
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
        url_multimedia,
      } = nuevaRefaccion;

      const refaccionData = {
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
        url_multimedia,
      };

      const respuesta = await axiosClient.post("/refacciones", refaccionData);
      console.log("Refacción creada:", respuesta.data);

      setMessage({ text: "Refacción creada con éxito", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error al crear la refacción.",
        type: "error",
      });
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await axiosClient.get("/categorias");
      setCategorias(respuesta.data);
    } catch (error) {
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

  const initDataTable = async () => {
    try {
      const respuesta = await axiosClient.get("/refacciones");

      dataTableRef.current = $("#datatable_refacciones").DataTable({
        data: respuesta.data,
        columns: [
          { data: "id" },
          { data: "estatus" },
          { data: "id_categoria" },
          { data: "id_marca" },
          { data: "id_clave_sat" },
          { data: "id_linea" },
          { data: "modelo" },
          { data: "cantidad" },
          { data: "sku" },
          { data: "informacion" },
          { data: "descripcion" },
          { data: "herramientas" },
          { data: "sintomas_fallas" },
          { data: "intercambios" },
          { data: "models" },
          { data: "position" },
          {
            data: null,
            render: function (data, type, row) {
              return `
                <button class="ui primary button">Editar</button>
                <button class="ui negative button">Eliminar</button>
              `;
            },
          },
        ],
        pageLength: 3,
        destroy: true,
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(filtrado de _MAX_ registros totales)",
          search: "Buscar:",
          loadingRecords: "Cargando registros...",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="ui grid">
        <div className="four wide column">
          <h3 className="" style={{ display: "flex", alignItems: "center" }}>
            <Icon
              name="wrench"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            />
            Refacciones
          </h3>
        </div>

        <div className="twelve wide column">
          <ModalRefaccion
            open={open}
            setOpen={setOpen}
            guardarRefaccion={guardarRefaccion}
            categorias={categorias}
            marca={marca}
            linea={linea}
            claveSat={claveSat}
            refaccionesState={refaccionesState}
            subcategoriasRecursivas={subcategoriasRecursivas}
            options={options}
          />

          <MensajeAlerta message={message} setMessage={setMessage} />

          <CargarExcelRefacciones setMessage={setMessage} />
        </div>
      </div>

      <div className="ui container">
        <table id="datatable_refacciones" className="ui celled table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Estatus</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Clave SAT</th>
              <th>Línea</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>SKU</th>
              <th>Información</th>
              <th>Descripción</th>
              <th>Herramientas</th>
              <th>Síntomas y fallas</th>
              <th>Intercambios</th>
              <th>Modelos</th>
              <th>Posición</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
