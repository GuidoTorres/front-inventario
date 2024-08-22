import React from "react";

import { Input, Form, Select } from "antd";
import dayjs from "dayjs";

const ImpresoraForm = ({
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
          name="trabajador_id"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
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
          label="Suministro"
          name="suministro"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.suministro || undefined}
            onChange={(e) => handleData(e.target.value, "suministro")}
            className="input-form"
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Tamaño"
          name="tamaño"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.tamaño || undefined}
            onChange={(e) => handleData(e.target.value, "tamaño")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
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
      </div>

      <div className="flex">
        <Form.Item
          className="flex-content"
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
        <Form.Item
          className="flex-content"
          style={{ visibility: "hidden" }}
          label="Proveedor"
          name="proveedor"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            style={{ visibility: "none" }}
            value={equipo.proveedor}
            onChange={(e) => handleData(e.target.value, "proveedor")}
            className="input-form"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default ImpresoraForm;
