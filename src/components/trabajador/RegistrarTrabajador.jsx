import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";

const RegistrarTrabajador = ({
  isModalOpen,
  setIsOpenModal,
  getTrabajadores,
  editar,
  setEditar,
}) => {
  const [form] = Form.useForm();
  const [trabajador, setTrabajador] = useState({});
  const [cargo, setCargo] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const closeModal = () => {
    setIsOpenModal(false);
    setEditar();
    form.resetFields();
  };

  const getCargos = async () => {
    const response = await fetch("http://localhost:8085/api/v1/cargos");

    const info = await response.json();
    if (info) setCargo(info.data);
  };

  const getEquipos = async () => {
    const response = await fetch("http://localhost:8085/api/v1/equipos/select");

    const info = await response.json();
    if (info) setEquipo(info.data);
  };
  useEffect(() => {
    getCargos();
    getEquipos();
  }, []);
  useEffect(() => {
    if (editar) {
      setTrabajador(editar);
      form.setFieldValue(editar);
    }
  }, [editar]);

  const handleData = (value, text) => {
    form.setFieldValue((value) => {
      return { ...value, [text]: value };
    });
  };

  const postTrabajador = async () => {
    if (editar) {
      const response = await fetch(
        `http://localhost:8085/api/v1/trabajadores/${editar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.getFieldsValue()),
        }
      );
      const confirm = await response.json();

      if (response.status === 200) {
        notification.success({
          message: confirm.msg,
        });
        getTrabajadores();
        closeModal();
      } else {
        notification.error({
          message: confirm.msg,
        });
      }
    } else {
      const response = await fetch(
        "http://localhost:8085/api/v1/trabajadores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.getFieldsValue()),
        }
      );
      const confirm = await response.json();

      if (response.status === 200) {
        notification.success({
          message: confirm.msg,
        });
        getTrabajadores();
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
      title="Registrar Trabajador"
      open={isModalOpen}
      onCancel={closeModal}
      okText={editar ? "Editar" : "Registrar"}
      cancelText={"Cancelar"}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={postTrabajador}>
        <Form.Item
          label="Nombres"
          name="nombres"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            onChange={(e) => handleData(e.target.value, "nombres")}
            value={trabajador.nombres}
          />
        </Form.Item>

        <Form.Item
          label="Apellido Paterno"
          name="apellido_paterno"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            onChange={(e) => handleData(e.target.value, "apellido_paterno")}
            value={trabajador.apellido_paterno}
          />
        </Form.Item>
        <Form.Item
          label="Apellido Materno"
          name="apellido_materno"
          rules={[
            {
              required: true,
              message: "Campo obligatorio.",
            },
          ]}
        >
          <Input
            onChange={(e) => handleData(e.target.value, "apellido_materno")}
            value={trabajador.apellido_materno}
          />
        </Form.Item>
        <Form.Item
          label="DNI"
          name="dni"
          rules={[
            { required: true, message: "Ingresa el DNI." },
            { len: 8, message: "El DNI debe tener 8 dígitos." },
            {
              pattern: /^[0-9]+$/,
              message: "El DNI debe contener solo números.",
            },
          ]}
        >
          <Input
            onChange={(e) => handleData(e.target.value, "dni")}
            value={trabajador.dni}
            count={{
              show: true,
              min: 8,
              max: 8,
            }}
            number
          />
        </Form.Item>
        <Form.Item
          label="Cargo"
          name="cargo_id"
          rules={[{ required: true, message: "Campo obligatorio." }]}
        >
          <Select
            style={{
              width: "100%",
            }}
            onChange={(e) => handleData(e, "cargo_id")}
            value={trabajador?.cargo_id}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={
              cargo.length > 0 &&
              cargo?.map((item) => {
                return {
                  value: item.id,
                  label: item.nombres,
                };
              })
            }
          />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button htmlType="submit" type="primary">
            {editar ? "Editar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrarTrabajador;
