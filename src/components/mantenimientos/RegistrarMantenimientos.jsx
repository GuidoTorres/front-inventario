import { Input, Modal, Select, Typography } from 'antd'
import React from 'react'

const RegistrarMantenimientos = ({isModalOpen}) => {
  return (
    <Modal
    title="Registrar Trabajador"
    open={isModalOpen}
    //   onCancel={isModalOpen}
  >
    <div>
      <Typography.Title level={5}>Nombres</Typography.Title>
      <Input />
      <Typography.Title level={5}>Apellido Paterno</Typography.Title>
      <Input />
      <Typography.Title level={5}>Apellido Materno</Typography.Title>
      <Input />
      <Typography.Title level={5}>Dni</Typography.Title>
      <Input />
      <Typography.Title level={5}>Cargo</Typography.Title>
      <Select style={{ width: "100%" }} />
      <Typography.Title level={5}>Equipo</Typography.Title>
      <Select style={{ width: "100%" }} />
    </div>
  </Modal>
  )
}

export default RegistrarMantenimientos