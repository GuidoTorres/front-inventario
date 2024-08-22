import React from "react";
import { Input, Form, Select } from "antd";
import dayjs from "dayjs";

const Perifericos = ({
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
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
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

      <div
        className="flex"
        style={{
          display:
            equipo.tipo === "Teclado" || equipo.tipo === "Mouse"
              ? "block"
              : "none",
        }}
      >
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
          style={{ visibility: "hidden" }}
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
      <div
        className="flex"
        style={{
          display: equipo.tipo === "Telefono" ? "flex" : "none",
        }}
      >
        <Form.Item
          className="flex-content"
          label="Anexo"
          name="anexo"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.anexo || undefined}
            onChange={(e) => handleData(e.target.value, "anexo")}
            className="input-form"
          />
        </Form.Item>
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
      </div>
    </>
  );
};

export default Perifericos;
