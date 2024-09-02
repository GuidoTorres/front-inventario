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
          label="Tipo"
          name="tipo"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.tipo}
            onChange={(e) => handleData(e, "tipo")}
            showSearch
            optionFilterProp="children"
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={[
              {
                value: "Access point",
                label: "Access point",
              },
              {
                value: "Disco Duro",
                label: "Disco Duro",
              },
              {
                value: "Estabilizador",
                label: "Estabilizador",
              },
              {
                value: "Proyector",
                label: "Proyector",
              },

              {
                value: "Cpu",
                label: "Cpu",
              },
              {
                value: "Monitor",
                label: "Monitor",
              },
              {
                value: "Laptop",
                label: "Laptop",
              },
              {
                value: "Telefono",
                label: "Teléfono",
              },
              {
                value: "Teclado",
                label: "Teclado",
              },
              {
                value: "Mouse",
                label: "Mouse",
              },
              {
                value: "Switch",
                label: "Switch",
              },
              {
                value: "Scanner",
                label: "Scanner",
              },
              {
                value: "Router",
                label: "Router",
              },
              {
                value: "Servidor",
                label: "Servidor",
              },
              {
                value: "Lector de cd",
                label: "Lector de cd",
              },

              {
                value: "Impresora",
                label: "Impresora",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Sub Tipo Impresora"
          name="subtipo_impresora"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
            value={equipo.subtipo_impresora || undefined}
            onChange={(e) => handleData(e, "subtipo_impresora")}
            allowClear
            showSearch
            optionFilterProp="children"
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                label: "Escaner",
                value: "Escaner",
              },
              {
                label: "Etiquetadora",
                value: "Etiquetadora",
              },
              {
                label: "Matricial",
                value: "Matricial",
              },
              {
                label: "Impresora",
                value: "Impresora",
              },
              {
                label: "Multifuncional Blanco y Negro",
                value: "Multifuncional Blanco y Negro",
              },
              {
                label: "Multifuncional Color",
                value: "Multifuncional Color",
              },
              {
                label: "Plotter",
                value: "Plotter",
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="SBN"
          name="sbn"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.sbn}
            onChange={(e) => handleData(e.target.value, "sbn")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Sede"
          name="sede_id"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.sede}
            onChange={(e) => handleData(e, "sede_id")}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={sedes?.map((item) => {
              return {
                value: item.id,
                label: item.nombre,
              };
            })}
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Modulo"
          name="modulo_id"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.modulo_id}
            onChange={(e) => handleData(e, "modulo_id")}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={modulos?.map((item) => {
              return {
                value: item.id,
                label: item.nombre,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Área"
          name="dependencia_id"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.dependencia_id}
            onChange={(e) => handleData(e, "dependencia_id")}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={area?.map((item) => {
              return {
                value: item.id,
                label: item.nombre,
              };
            })}
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Oficina"
          name="sub_dependencia_id"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.sub_dependencia_id}
            onChange={(e) => handleData(e, "sub_dependencia_id")}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={oficina?.map((item) => {
              return {
                value: item.id,
                label: item.nombre,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Descripción"
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.descripcion || undefined}
            onChange={(e) => handleData(e.target.value, "descripcion")}
            className="input-form"
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Marca"
          name="marca"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.marca || undefined}
            onChange={(e) => handleData(e.target.value, "marca")}
            className="input-form"
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Modelo"
          name="modelo"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={equipo.modelo || undefined}
            onChange={(e) => handleData(e.target.value, "modelo")}
            className="input-form"
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Estado"
          name="estado"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.estado}
            onChange={(e) => handleData(e, "estado")}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={[
              {
                value: "1",
                label: "Bueno",
              },
              {
                value: "2",
                label: "Regular",
              },
              {
                value: "3",
                label: "Malo",
              },
              {
                value: "4",
                label: "Muy Malo",
              },
              {
                value: "5",
                label: "Nuevo",
              },
              {
                value: "6",
                label: "Chatarra",
              },
              {
                value: "7",
                label: "RAEE",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content"
          label="Año de ingreso"
          name="ingreso"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            value={dayjs(editar?.ingreso).format("YYYY-MM-DD") || undefined}
            onChange={(e) => handleData(e.target.value, "ingreso")}
            className="input-form"
          />
        </Form.Item>
      </div>
      <div className="flex">
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
          <Select
            className="input-form"
            value={equipo.suministro || undefined}
            onChange={(e) => handleData(e, "suministro")}
            allowClear
            showSearch
            optionFilterProp="children"
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                label: "Cinta",
                value: "Cinta",
              },
              {
                label: "Etiqueta",
                value: "Etiqueta",
              },
              {
                label: "Rollo",
                value: "Rollo",
              },
              {
                label: "Tinta",
                value: "Tinta",
              },
              {
                label: "Toner",
                value: "Toner",
              },
            ]}
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
      <div className="flex">
        <Form.Item
          className="flex-content"
          label="Encargado"
          name="trabajador_id"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
            showSearch
            optionFilterProp="children"
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
            value={equipo.proveedor || undefined}
            onChange={(e) => handleData(e.target.value, "proveedor")}
            className="input-form"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default ImpresoraForm;
