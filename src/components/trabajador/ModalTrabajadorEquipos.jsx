import { Modal, Table, Tag } from "antd";
import React from "react";

const ModalTrabajadorEquipos = ({
  isModalOpen,
  setIsOpenModal,
  getTrabajadores,
  editar,
  setEditar,
}) => {
  const closeModal = () => {
    setIsOpenModal(false);
    setEditar();
  };
  const columns = [
    // {
    //   title: "Nro",
    //   dataIndex: "nro",
    //   align: "center",
    // },
    {
      title: "SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      align: "center",
      render: (_, { estado }) => (
        <>
          {estado === "BUENO" || estado === "Bueno" ? (
            <Tag color="green">{estado}</Tag>
          ) : estado === "REGULAR" || estado === "Regular" ? (
            <Tag color="gold">{estado}</Tag>
          ) : estado === "MALO" || estado === "Malo" ? (
            <Tag color="red">{estado}</Tag>
          ) : estado === "NUEVO" || estado === "Nuevo" ? (
            <Tag color="blue">{estado}</Tag>
          ) : null}
        </>
      ),
    },
    // {
    //   title: "Acciones",
    //   align: "center",
    //   key: "action",
    //   render: (_, record) => (
    //     <Flex align="center" justify="center" gap={2}>
    //       <Button onClick={() => handleEdit(record)}>
    //         <EditOutlined />
    //       </Button>
    //       <Popconfirm
    //         title="Eliminar trabajador"
    //         description="Estas seguro de eliminar?"
    //         onConfirm={() => handleDelete(record.id)}
    //         // onCancel={cancel}
    //         okText="Si"
    //         cancelText="No"
    //       >
    //         <Button>
    //           <DeleteOutlined />
    //         </Button>
    //       </Popconfirm>
    //     </Flex>
    //   ),
    // },
  ];
  return (
    <Modal
      title="Equipos"
      open={isModalOpen}
      onCancel={closeModal}
      okText={editar ? "Editar" : "Registrar"}
      cancelText={"Cancelar"}
      footer={null}
      width={800}
    >
      <Table columns={columns} dataSource={editar?.equipos} />
    </Modal>
  );
};

export default ModalTrabajadorEquipos;
