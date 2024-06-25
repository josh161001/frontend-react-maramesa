import React, { useEffect, useRef, useState } from "react";
import { Icon, Modal, Button } from "semantic-ui-react";
import { MensajeAlerta } from "../../../components";
import { CargarExcelRefacciones, ModalRefaccion } from "./components";
import $ from "jquery";
import "datatables.net";
import axiosClient from "../../../api/Axios";

export const Refacciones = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [open, setOpen] = useState(false);
  const [refaccionEliminar, setRefaccionEliminar] = useState(null);
  const dataTableRef = useRef(null);
  const [dataTableInit, setDataTableInit] = useState(false);

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
  }, []);

  const initDataTable = () => {
    $.ajax({
      url: "http://localhost:8000/api/refacciones",
      type: "GET",
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta),
          (dataTableRef.current = $("#datatable_refacciones").DataTable({
            data: respuesta,
            columns: [
              { data: "id" },
              { data: "categorias.nombre", defaultContent: "No hay categoría" },
              { data: "marcas.nombre", defaultContent: "No hay marca" },
              { data: "claves_sat.clave", defaultContent: "No hay clave SAT" },
              { data: "lineas.nombre", defaultContent: "No hay línea" },
              { data: "modelo", defaultContent: "No hay modelo" },
              { data: "cantidad", defaultContent: "No hay cantidad" },
              { data: "sku", defaultContent: "No hay SKU" },
              { data: "informacion", defaultContent: "No hay información" },
              { data: "position", defaultContent: "No hay posición" },
              {
                data: null,

                render: function (data, type, row) {
                  const url_refaccion = `/sistema/refacciones/editar-refaccion/${data.id}`;
                  return `
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <a href="${url_refaccion}" class="ui icon primary button">
                        <i class="icon edit"></i>
                      </a>
                            <button class="ui icon red button eliminar-btn">
                                <i class="icon trash"></i>
                            </button>
                    </div>
                  `;
                },
              },
            ],
            destroy: true,
            columnDefs: [
              {
                orderable: false,
                targets: 10,
              },
            ],
            fixedHeader: true,
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
            //permite manipular el boton de eliminar
            initComplete: function () {
              $("#datatable_refacciones tbody").on(
                "click",
                ".eliminar-btn",
                function () {
                  const data = dataTableRef.current
                    .row($(this).parents("tr"))
                    .data();
                  handleEliminarRefaccion(data.id);
                }
              );
            },
          }));

        if ($("#datatable_refacciones thead tr").length === 1) {
          $("#datatable_refacciones thead tr")
            .clone(true)
            .appendTo("#datatable_refacciones thead");

          $("#datatable_refacciones thead tr:eq(1) th").each(function (i) {
            if (i < 10) {
              let title = $(this).text();
              $(this).html(
                '<input type="text" placeholder="Buscar ' + title + '" />'
              );

              $("input", this).on("keyup change", function () {
                if (dataTableRef.current.column(i).search() !== this.value) {
                  dataTableRef.current.column(i).search(this.value).draw();
                }
              });
            } else {
              $(this).html("");
            }
          });
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  };

  const handleEliminarRefaccion = (id) => {
    setRefaccionEliminar(id);
    setOpen(true);
  };

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
        size="mini"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Eliminar Refacción</Modal.Header>
        <Modal.Content>
          <p>¿Estás seguro de eliminar la refacción?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            positive
            content="Sí"
            onClick={async () => {
              try {
                await axiosClient.delete(`/refacciones/${refaccionEliminar}`);
                setMessage({
                  text: "Refacción eliminada correctamente",
                  type: "success",
                });
                setRefaccionEliminar(null);
                setOpen(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </Modal.Actions>
      </Modal>

      <div className="ui grid container">
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
          <ModalRefaccion />

          <MensajeAlerta message={message} setMessage={setMessage} />

          <CargarExcelRefacciones setMessage={setMessage} />
        </div>
      </div>

      <div
        className="ui container"
        style={{
          marginTop: "30px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <table
          id="datatable_refacciones"
          className="table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderSpacing: 0,
            overflow: "auto",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>SAT</th>
              <th>Línea</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>SKU</th>
              <th>Información</th>
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
