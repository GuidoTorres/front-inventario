import {
  Input,
  Modal,
  Select,
  Typography,
  notification,
  Form,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";

import "./styles/registrarEquipos.css";
import dayjs from "dayjs";
import ImpresoraForm from "./ImpresoraForm";
import Perifericos from "./Perifericos";
import ComputadoraForm from "./ComputadoraForm";
import MonitorForm from "./MonitorForm";

const RegistrarEquipo = ({
  isModalOpen,
  setIsOpenModal,
  getEquipos,
  editar,
  setEditar,
}) => {
  const [form] = Form.useForm();
  const valoresAqp = [
    {
      value: "Modulo 1",
      label: "Modulo 1",
    },
    {
      value: "Modulo 2",
      label: "Modulo 2",
    },
    {
      value: "Modulo 3",
      label: "Modulo 3",
    },
    {
      value: "Modulo 4",
      label: "Modulo 4",
    },
    {
      value: "Modulo 5",
      label: "Modulo 5",
    },
    {
      value: "Modulo 6",
      label: "Modulo 6",
    },
    {
      value: "Modulo 7",
      label: "Modulo 7",
    },
    {
      value: "OCI",
      label: "OCI",
    },
    {
      value: "OPIP",
      label: "OPIP",
    },
    {
      value: "Gestión ambiental",
      label: "Gestión ambiental",
    },
    {
      value: "Almacén",
      label: "Almacén",
    },
    {
      value: "Transporte",
      label: "Transporte",
    },
  ];

  const valoresMajes = [
    {
      value: "Sector Majes",
      label: "Sector Majes",
    },
    {
      value: "Canal 2R",
      label: "Canal 2R",
    },
    {
      value: "Canal 3R",
      label: "Canal 3R",
    },
    {
      value: "Pitay",
      label: "Pitay",
    },
    {
      value: "Santa Rita",
      label: "Santa Rita",
    },
    {
      value: "Rio Arma",
      label: "Rio Arma",
    },
  ];
  const [equipo, setEquipo] = useState({});
  const [sedes, setSedes] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [area, setArea] = useState([]);
  const [oficina, setOficina] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [trabajador, setTrabajador] = useState([]);
  const initialValues = {
    sbn: "",
    descripcion: "",
    marca: "",
    sector: "",
    tipo: "",
    ingreso: "",
    modulo: "",
    area: "",
    procesador: "",
    disco_duro: "",
    capacidad: "",
    memoria: "",
    tarjeta_video: "",
    estado: "",
    proveedor: "",
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setEditar();
    form.resetFields();
  };
  useEffect(() => {
    if (editar) {
      const format = { ...editar, ingreso: dayjs(editar.fecha_ingreso).format("YYYY") };
      setEquipo(format);
      form.setFieldsValue(format);
    } else {
      setEquipo(initialValues);
    }
  }, [editar]);

  useEffect(() => {
    getSedes();
    getTrabajador();
    getModulos();
    getAreas();
    getOficinas();
  }, []);

  console.log("====================================");
  console.log(equipo);
  console.log("====================================");

  const getSedes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/sedes`);

    const info = await response.json();
    if (info) setSedes(info.data);
  };
  const getModulos = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/modulos`);

    const info = await response.json();
    if (info) setModulos(info.data);
  };

  const getAreas = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/dependencia/select`
    );

    const info = await response.json();
    if (info) setArea(info.data);
  };
  const getOficinas = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/subdependencias/select`
    );

    const info = await response.json();
    if (info) setOficina(info.data);
  };

  const getTrabajador = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/trabajadores/select`
    );

    const info = await response.json();
    if (info) setTrabajador(info.data);
  };

  const handleData = (value, text) => {
    setEquipo((values) => {
      return { ...values, [text]: value };
    });
    form.setFieldValue((value) => {
      return { ...value, [text]: value };
    });
  };

  const postEquipo = async () => {
    if (editar) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE}/equipos/${editar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(equipo),
        }
      );
      const confirm = await response.json();

      if (response.status === 200) {
        notification.success({
          message: confirm.msg,
        });
        getEquipos();
        closeModal();
      } else {
        notification.error({
          message: confirm.msg,
        });
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_BASE}/equipos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipo),
      });
      const confirm = await response.json();

      if (response.status === 200) {
        notification.success({
          message: confirm.msg,
        });
        getEquipos();
        closeModal();
      } else {
        notification.error({
          message: confirm.msg,
        });
      }
    }
  };

  return (
    <Modal
      title={
        !editar ? (
          <Typography.Title level={5} className="title">
            Registrar equipo
          </Typography.Title>
        ) : (
          <Typography.Title level={5} className="title">
            Editar equipo
          </Typography.Title>
        )
      }
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={equipo.tipo === "Cpu" || equipo.tipo === "Laptop" ? "50%" : "40%"}
    >
      <Form form={form} layout="vertical" onFinish={postEquipo}>
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
        </div>
        <div className="flex">
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
        </div>
        <div className="flex">
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
        </div>
        <div className="flex">
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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

        {equipo.tipo === "Impresora" || equipo.tipo === "Scanner" ? (
          <ImpresoraForm
            equipo={equipo}
            editar={editar}
            handleData={handleData}
            sedes={sedes}
            modulos={modulos}
            area={area}
            oficina={oficina}
            trabajador={trabajador}
          />
        ) : null}

        {equipo.tipo !== "Monitor" &&
          equipo.tipo !== "Impresora" &&
          equipo.tipo !== "Scanner" &&
          equipo.tipo !== "Cpu" &&
          equipo.tipo !== "Laptop" && (
            <Perifericos
              equipo={equipo}
              editar={editar}
              handleData={handleData}
              sedes={sedes}
              modulos={modulos}
              area={area}
              oficina={oficina}
              trabajador={trabajador}
            />
          )}

        {equipo.tipo === "Cpu" || equipo.tipo === "Laptop" ? (
          <ComputadoraForm
            equipo={equipo}
            editar={editar}
            handleData={handleData}
            sedes={sedes}
            modulos={modulos}
            area={area}
            oficina={oficina}
            trabajador={trabajador}
          />
        ) : null}

        {equipo.tipo === "Monitor" ? (
          <MonitorForm
            equipo={equipo}
            editar={editar}
            handleData={handleData}
            sedes={sedes}
            modulos={modulos}
            area={area}
            oficina={oficina}
            trabajador={trabajador}
          />
        ) : null}

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button htmlType="submit" type="primary">
            {editar ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrarEquipo;
