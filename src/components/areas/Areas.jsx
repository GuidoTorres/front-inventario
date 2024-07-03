import { Button, Flex, Popconfirm, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import RegistrarAreas from "./RegistrarAreas";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const Areas = ({ setTitle }) => {
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [search, setSearch] = useState()
  useEffect(() => {
    setTitle("Unidades");
    getAreas();
  }, []);
  const getAreas = async () => {
    const response = await fetch("http://localhost:8085/api/v1/unidad");

    const info = await response.json();
    if (info) 
   { setAreas(info.data);
    setSearch(info.data)}
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombres",
      align: "center",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
    },
    {
      title: "Modulo",
      dataIndex: "modulo",
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

  const handleEdit = (val) => {
    setIsModalOpen(true);
    setEditar(val);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8085/api/v1/unidad/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const confirm = await response.json();

    if (response.status === 200) {
      notification.success({
        message: "Éxito!",
        description: confirm.msg,
      });
      getAreas();
    } else {
      notification.error({
        message: "Error!",
        description: confirm.msg,
      });
    }
  };

  const onSearch = (val) => {
    const filterData = () => {
      let value = val.toLowerCase(); // Convertir el valor de búsqueda a minúsculas

      if (!val) {
        return areas;
      } else {
        const filter = areas.filter(
          (item) =>
            item?.nombres?.toLowerCase().includes(value) ||
            item?.descripcion?.toLowerCase().includes(value) ||
            item?.modulo?.toLowerCase().includes(value)
        );
        return filter;
      }
    };
    setSearch(filterData());
  };  return (
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
      <Table columns={columns} dataSource={search} />;
      {isModalOpen && (
        <RegistrarAreas
          isModalOpen={isModalOpen}
          setIsOpenModal={setIsModalOpen}
          getAreas={getAreas}
          editar={editar}
          setEditar={setEditar}
        />
      )}
    </>
  );
};

export default Areas;
