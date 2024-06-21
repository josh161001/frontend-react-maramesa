// ModalRefaccion.js

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

export const ModalRefaccion = ({
  open,
  setOpen,
  guardarRefaccion,
  categorias,
  marca,
  linea,
  claveSat,
  refaccionesState,
  subcategoriasRecursivas,
  options,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button className="ui right floated button icon left labeled teal">
          <i className="plus icon"></i>
          Registrar{" "}
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
              onChange={refaccionesState}
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
              onChange={refaccionesState}
              placeholder="Escribe el modelo..."
              required
            />
            <Form.Input
              fluid
              name="sku"
              onChange={refaccionesState}
              label="SKU (Codigo del producto)"
              placeholder="Escribe el codigo..."
              required
            />
            <Form.Input
              fluid
              name="cantidad"
              type="number"
              onChange={refaccionesState}
              label="cantidad"
              placeholder="Escribe el codigo..."
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              name="id_categoria"
              label="Categoria"
              placeholder="Categoria..."
              onChange={refaccionesState}
              options={options}
              search
              required
            />
            <Form.Select
              fluid
              name="id_marca"
              label="Marca"
              placeholder="Marca..."
              onChange={refaccionesState}
              options={
                marca &&
                marca.map((marca) => {
                  return {
                    key: marca.id,
                    text: marca.nombre,
                    value: marca.id,
                  };
                })
              }
              search
              required
            />
            <Form.Select
              fluid
              name="id_linea"
              label="Linea"
              placeholder="Linea..."
              onChange={refaccionesState}
              options={
                linea &&
                linea.map((linea) => {
                  return {
                    key: linea.id,
                    text: linea.nombre,
                    value: linea.id,
                  };
                })
              }
              search
              required
            />
            <Form.Select
              fluid
              name="id_clave_sat"
              label="Clave SAT"
              placeholder="Clave SAT..."
              onChange={refaccionesState}
              options={
                claveSat &&
                claveSat.map((claveSat) => {
                  return {
                    key: claveSat.id,
                    text: claveSat.clave,
                    value: claveSat.id,
                  };
                })
              }
              search
              required
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.TextArea
              name="descripcion"
              label="Descripcion"
              onChange={refaccionesState}
              placeholder="Escribe la descripción..."
              required
            />
            <Form.TextArea
              name="informacion"
              label="Informacion Adicional"
              onChange={refaccionesState}
              placeholder="Escribe la informacion..."
              required
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.TextArea
              name="herramientas"
              label="Herramientas"
              onChange={refaccionesState}
              placeholder="Escribe la descripción..."
              required
            />
            <Form.TextArea
              name="sintomas_fallas"
              label="Sintomas o fallas"
              onChange={refaccionesState}
              placeholder="Escribe la informacion..."
              required
            />
            <Form.TextArea
              name="intercambios"
              label="Intercambios"
              onChange={refaccionesState}
              placeholder="Escribe la informacion..."
              required
            />
          </Form.Group>

          <FormField
            control={Input}
            type="file"
            name="url_multimedia"
            onChange={refaccionesState}
            label="Imagenes o videos"
            placeholder="Imagenes o videos"
            multiple
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
            />
          </ModalActions>
        </Form>
      </ModalContent>
    </Modal>
  );
};
