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
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
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
          label="Procesador"
          name="procesador"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.procesador || undefined}
            onChange={(e) => handleData(e.target.value, "procesador")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Grafica Dedicada"
          name="tarjeta_video"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.tarjeta_video || undefined}
            onChange={(e) => handleData(e.target.value, "tarjeta_video")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Tipo de disco duro"
          name="tipo_disco_duro"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.tipo_disco_duro || undefined}
            onChange={(e) => handleData(e.target.value, "tipo_disco_duro")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Capacidad Disco duro"
          name="almacenamiento"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.almacenamiento || undefined}
            onChange={(e) => handleData(e.target.value, "almacenamiento")}
            className="input-form"
          />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Memoria ram"
          name="memoria_ram"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.memoria_ram || undefined}
            onChange={(e) => handleData(e.target.value, "memoria_ram")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Licencia Office"
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
          label="Versión Office"
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
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Lincencia Windows"
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
                value: true,
              },
              {
                label: "NO LICENCIADO",
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Versión Sistema Operativo"
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
            onChange={(e) => handleData(e, "antivirus")}
            options={[
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
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content-pc"
          label="Unidad Optica"
          name="unidad_optica"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.unidad_optica || undefined}
            onChange={(e) => handleData(e, "unidad_optica")}
            options={[
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
          label="Usuario"
          name="usuario_actual"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.usuario_actual || undefined}
            onChange={(e) => handleData(e.target.value, "usuario_actual")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="IP"
          name="ip"
          rules={[
            {
              required: false,
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
