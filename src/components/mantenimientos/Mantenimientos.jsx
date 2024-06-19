import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import RegistrarMantenimientos from "./RegistrarMantenimientos";

const Mantenimientos = ({ setTitle }) => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setTitle("Mantenimientos");
    getAreas();
  }, []);
  const getAreas = async () => {
    const response = await fetch("http://10.30.1.42:8085/api/v1/mantenimientos");

    const info = await response.json();
    if (info) setMantenimientos(info.data);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
  ];
  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setIsModalOpen(true)}>Registrar</Button>
      </div>
      <Table columns={columns} dataSource={mantenimientos} />;
      {isModalOpen && <RegistrarMantenimientos isModalOpen={isModalOpen} />}
    </>
  );
};

export default Mantenimientos;
