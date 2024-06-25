import { useState } from "react";
import axiosClient from "../../../../api/Axios";

export const CargarExcelRefacciones = ({ setMessage }) => {
  const [selectFile, setSelectFile] = useState(null);

  const guardarFileState = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const cargarExcel = async (e) => {
    e.preventDefault();

    try {
      if (!selectFile) {
        setMessage({
          text: "Debes seleccionar un archivo Excel.",
          type: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("import_file", selectFile);

      const respuesta = await axiosClient.post(
        "/refacciones/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({ text: "Refacciones importadas con éxito", type: "success" });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Error al importar las refacciones.",
        type: "error",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <form
      className="ui right floated header"
      encType="multipart/form-data"
      accept=".xls, .csv, .xlsx"
    >
      <div>
        <input
          id="file"
          type="file"
          onChange={guardarFileState}
          style={{ display: "none" }}
        />
        <label htmlFor="file" className="ui icon left labeled button olive">
          <i
            style={{
              fontSize: "1.2rem",
              marginRight: "40px",
            }}
            className="upload icon"
          ></i>
          Elegir Archivo Excel
        </label>

        <input
          type="submit"
          value="Importar Excel"
          onClick={cargarExcel}
          disabled={!selectFile}
          className="ui icon red button"
        />
      </div>
    </form>
  );
};
