import { Select, Form, Input } from "antd";
import React from "react";
import dayjs from "dayjs";

const ComputadoraForm = ({
  equipo,
  handleData,
  sedes,
  modulos,
  area,
  oficina,
  editar,
  trabajador,
}) => {
  return (
    <>


      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Encargado"
          name="trabajador_id"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.trabajador_id || undefined}
            onChange={(e) => handleData(e, "trabajador_id")}
            allowClear
            popupMatchSelectWidth={false}

            options={trabajador.map((item) => {
              return {
                label: item.nombre,
                value: parseInt(item.id),
              };
            })}
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Nombre Pc"
          name="nombre_pc"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.nombre_pc || undefined}
            onChange={(e) => handleData(e.target.value, "nombre_pc")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Mac"
          name="mac"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.mac || undefined}
            onChange={(e) => handleData(e.target.value, "mac")}
            className="input-form"
          />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Ofimatica"
          name="ofimatica"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.ofimatica || undefined}
            onChange={(e) => handleData(e, "ofimatica")}

            options={[
              {
                label: "LICENCIADO",
                value: "LICENCIADO",
              },
              {
                label: "NO LICENCIADO",
                value: "NO LICENCIADO",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Office"
          name="office"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.office || undefined}
            onChange={(e) => handleData(e.target.value, "office")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Windows"
          name="windows"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.windows || undefined}
            onChange={(e) => handleData(e, "windows")}

            options={[
              {
                label: "LICENCIADO",
                value: "LICENCIADO",
              },
              {
                label: "NO LICENCIADO",
                value: "NO LICENCIADO",
              },
            ]}
          />
        </Form.Item>
      </div>


      <div className="flex">
      <Form.Item
          className="flex-content-pc"
          label="Sistema Operativo"
          name="sistema_operativo"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.sistema_operativo || undefined}
            onChange={(e) => handleData(e.target.value, "sistema_operativo")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Antivirus"
          name="antivirus"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.antivirus || undefined}
            onChange={[
              {
                label: "SI",
                value: true,
              },
              {
                label: "NO",
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Unidad Optica"
          name="unidad_optica"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.unidad_optica || undefined}
            onChange={(e) => handleData(e.target.value, "unidad_optica")}
            className="input-form"
          />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Usuario"
          name="usuario"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.usuario || undefined}
            onChange={(e) => handleData(e.target.value, "usuario")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="IP"
          name="ip"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.ip || undefined}
            onChange={(e) => handleData(e.target.value, "ip")}
            className="input-form"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default ComputadoraForm;
