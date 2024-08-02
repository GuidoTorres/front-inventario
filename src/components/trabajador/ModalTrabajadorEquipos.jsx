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
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
    },
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
      render: (_,record) => (
        <>
          {record.estado_conserv === "1" || record.estado_conserv === "1" ? (
            <Tag color="green">Bueno</Tag>
          ) : record.estado_conserv === "2" || record.estado_conserv === "2" ? (
            <Tag color="blue">Regular</Tag>
          ) : record.estado_conserv === "3" || record.estado_conserv === "3" ? (
            <Tag color="red">Malo</Tag>
          ) : record.estado_conserv === "4" || record.estado_conserv === "4" ? (
            <Tag color="volcano">Muy Malo</Tag>
          ) : record.estado_conserv === "5" || record.estado_conserv === "5" ? (
            <Tag color="blue">Nuevo</Tag>
          ) : record.estado_conserv === "6" || record.estado_conserv === "6" ? (
            <Tag color="purple">Chatarra</Tag>
          ) : record.estado_conserv === "7" || record.estado_conserv === "7" ? (
            <Tag color="magenta">RAEE</Tag>
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
      title={`Equipos`}
      open={isModalOpen}
      onCancel={closeModal}
      okText={editar ? "Editar" : "Registrar"}
      cancelText={"Cancelar"}
      footer={null}
      width={800}
    >
      <label htmlFor=""> <strong>Total: </strong>{editar.equipos.length}</label>
      <Table columns={columns} dataSource={editar?.equipos} />
    </Modal>
  );
};

export default ModalTrabajadorEquipos;
