import { Button, Flex, Popconfirm, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import RegistrarCargos from "./RegistrarCargos";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const Cargos = ({ setTitle }) => {
  const [cargos, setCargos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [search, setSearch] = useState([]);
  useEffect(() => {
    setTitle("Dependencias");
    getCargos();
  }, []);
  const getCargos = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/dependencia`);

    const info = await response.json();
    if (info) {
      setCargos(info.data);
      setSearch(info.data);
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Sede",
      render: (_, record) => record?.sede?.nombre,
      align: "center",
    },
    {
      title: "Dependencia",
      dataIndex: "nombre",
      align: "center",
    },
    {
      title: "Modulo",
      render: (item) => item?.modulo?.nombre,
      align: "center",
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
            title="Eliminar Cargo"
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

  const handleEdit = (val) => {
    setIsModalOpen(true);
    setEditar(val);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/cargos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const confirm = await response.json();

    if (response.status === 200) {
      notification.success({
        message: confirm.msg,
      });
      getCargos();
    } else {
      notification.error({
        message: confirm.msg,
      });
    }
  };
  const onSearch = (val) => {
    const filterData = () => {
      let value = val.toLowerCase(); // Convertir el valor de búsqueda a minúsculas

      if (!val) {
        return cargos;
      } else {
        const filter = cargos.filter(
          (item) =>
            item?.nombres?.toLowerCase().includes(value) ||
            item?.descripcion?.toLowerCase().includes(value) ||
            item?.area?.nombre?.toLowerCase().includes(value)
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
          <Button
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: "#4f6f52", color: "white" }}
          >
            Registrar
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={search} />;
      {isModalOpen && (
        <RegistrarCargos
          isModalOpen={isModalOpen}
          setIsOpenModal={setIsModalOpen}
          getCargos={getCargos}
          editar={editar}
          setEditar={setEditar}
        />
      )}
    </>
  );
};

export default Cargos;
