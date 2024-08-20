import React from "react";
import { Input, Form, Select } from "antd";
import dayjs from "dayjs";
const MonitorForm = ({
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
          className="flex-content"
          label="Encargado"
          name="encargado"
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
            options={trabajador.map((item) => {
              return {
                label: item.nombre,
                value: parseInt(item.id),
              };
            })}
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Tecnología"
          name="tecnologia"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.tecnologia || undefined}
            onChange={(e) => handleData(e.target.value, "tecnologia")}
            className="input-form"
          />
        </Form.Item>

      </div>

      <div className="flex">
      <Form.Item
          className="flex-content"
          label="Pulgadas"
          name="pulgadas"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.pulgadas || undefined}
            onChange={(e) => handleData(e.target.value, "pulgadas")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Usuario"
          name="usuario"
          rules={[
            {
              required: false,
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
      </div>
      <div className="flex">

        <Form.Item
          className="flex-content"
          label="SBN - CPU"
          name="sbn_cpu"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.sbn_cpu || undefined}
            onChange={(e) => handleData(e.target.value, "sbn_cpu")}
            className="input-form"
          />
        </Form.Item>

        <Form.Item
          className="flex-content"
          style={{visibility:"hidden"}}
          label="Usuario"
          name="usuario"
          rules={[
            {
              required: false,
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
      </div>
    </>
  );
};

export default MonitorForm;
