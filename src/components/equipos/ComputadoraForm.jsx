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
      </div>
      <div className="flex">
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
          <Select
            className="input-form"
            value={equipo.procesador}
            onChange={(e) => handleData(e, "procesador")}
            showSearch
            optionFilterProp="children"
            style={{ width: "100%" }}
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={[
              { value: "Intel Core i3", label: "Intel Core i3" },
              { value: "Intel Core i5", label: "Intel Core i5" },
              { value: "Intel Core i7", label: "Intel Core i7" },
              { value: "Intel Core i9", label: "Intel Core i9" },
              { value: "Intel Pentium", label: "Intel Pentium" },
              { value: "Intel Celeron", label: "Intel Celeron" },
              { value: "Intel Xeon", label: "Intel Xeon" },
              { value: "AMD Ryzen 3", label: "AMD Ryzen 3" },
              { value: "AMD Ryzen 5", label: "AMD Ryzen 5" },
              { value: "AMD Ryzen 7", label: "AMD Ryzen 7" },
              { value: "AMD Ryzen 9", label: "AMD Ryzen 9" },
              { value: "AMD Athlon", label: "AMD Athlon" },
              { value: "AMD FX", label: "AMD FX" },
              { value: "AMD Threadripper", label: "AMD Threadripper" },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="flex-content-pc"
          label="Generación "
          name="generacion_procesador"
          rules={[
            {
              required: false,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Select
            className="input-form"
            value={equipo.generacion_procesador}
            onChange={(e) => handleData(e, "generacion_procesador")}
            showSearch
            optionFilterProp="children"
            style={{ width: "100%" }}
            popupMatchSelectWidth={false}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={[
              { value: "1ra Gen", label: "1ra Gen" },
              { value: "2da Gen", label: "2da Gen" },
              { value: "3ra Gen", label: "3ra Gen" },
              { value: "4ta Gen", label: "4ta Gen" },
              { value: "5ta Gen", label: "5ta Gen" },
              { value: "6ta Gen", label: "6ta Gen" },
              { value: "7ma Gen", label: "7ma Gen" },
              { value: "8va Gen", label: "8va Gen" },
              { value: "9na Gen", label: "9na Gen" },
              { value: "10ma Gen", label: "10ma Gen" },
              { value: "11va Gen", label: "11va Gen" },
              { value: "12va Gen", label: "12va Gen" },
              { value: "13va Gen", label: "13va Gen" },
              { value: "14va Gen", label: "14va Gen" },
            ]}
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
      </div>

      <div className="flex">
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
          label="Licencia Windows"
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
