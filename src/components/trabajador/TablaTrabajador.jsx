import { Button, Flex, Popconfirm, Table, notification, Switch } from "antd";
import React, { useEffect, useState } from "react";
import RegistrarTrabajador from "./RegistrarTrabajador";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ModalTrabajadorEquipos from "./ModalTrabajadorEquipos";

const TablaTrabajador = ({ setTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);
  const [editar, setEditar] = useState();
  const [search, setSearch] = useState([]);
  useEffect(() => {
    setTitle("Trabajadores");
    getTrabajadores();
  }, []);

  const getTrabajadores = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/trabajadores`);
    const info = await response.json();
    if (info) {
      setTrabajadores(info.data);
      setSearch(info.data);
    }
  };
  const columns = [
    {
      title: "Id",
      align: "center",
      dataIndex: "id",
    },

    {
      title: "Trabajador",
      align: "center",
      render: (item) =>
        item?.nombres +
        " " +
        item.apellido_paterno +
        " " +
        item.apellido_materno,
    },
    {
      title: "Cargo",
      align: "center",
      render: (item) => item?.de_func,
    },
    {
      title: "Equipos",
      align: "center",
      key: "equipo",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={2}>
          {record?.equipos?.length > 0 ? (
            <Button onClick={() => handleEquipos(record)}>
              <EyeOutlined />
            </Button>
          ) : (
            <Button>
              <EyeInvisibleOutlined />
            </Button>
          )}
        </Flex>
      ),
    },
    {
      title: "Estado",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={2}>
          <Switch checked={record.estado} onChange={() =>handleEstado(record.id)}/>{" "}
        </Flex>
      ),
    },
    {
      title: "Acciones",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={2}>
          <Button onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Eliminar trabajador"
            description="Estas seguro de eliminar?"
            onConfirm={() => handleDelete(record.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
  

  const handleDelete = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/trabajadores/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const confirm = await response.json();

    if (response.status === 200) {
      notification.success({
        message: confirm.msg,
      });
      getTrabajadores();
    } else {
      notification.error({
        message: confirm.msg,
      });
    }
  };

  const handleEstado = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/trabajadores/estado/${id}`,
      {
        method: "GET",
      }
    );
    const confirm = await response.json();

    if (response.status === 200) {
      notification.success({
        message: confirm.msg,
      });
      getTrabajadores();
    } else {
      notification.error({
        message: confirm.msg,
      });
    }
  };

  const handleEdit = (data) => {
    setIsModalOpen(true);
    setEditar(data);
  };
  const handleEquipos = (data) => {
    setIsModalOpen2(true);
    setEditar(data);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (val) => {
    const filterData = () => {
      let value = val.toLowerCase(); // Convertir el valor de búsqueda a minúsculas

      if (!val) {
        return trabajadores;
      } else {
        const filter = trabajadores.filter(
          (item) =>
            item.nombres.toLowerCase().includes(value) ||
            item.apellido_paterno.toLowerCase().includes(value) ||
            item.apellido_materno.toLowerCase().includes(value)
          // item.dni.includes(value) // Asumiendo que DNI es numérico o ya está en minúsculas
        );
        return filter;
      }
    };
    setSearch(filterData());
  };
  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Search
            placeholder="Buscar"
            style={{ width: "30%" }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div
          style={{ width: "30%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={() => setIsModalOpen(true)}>Registrar</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={search} onChange={onChange} />
      {isModalOpen && (
        <RegistrarTrabajador
          isModalOpen={isModalOpen}
          setIsOpenModal={setIsModalOpen}
          getTrabajadores={getTrabajadores}
          editar={editar}
          setEditar={setEditar}
        />
      )}
      {isModalOpen2 && (
        <ModalTrabajadorEquipos
          isModalOpen={isModalOpen2}
          setIsOpenModal={setIsModalOpen2}
          getTrabajadores={getTrabajadores}
          editar={editar}
          setEditar={setEditar}
        />
      )}
    </>
  );
};

export default TablaTrabajador;
