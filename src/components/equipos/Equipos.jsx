import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Popconfirm,
  Select,
  Table,
  Tag,
  notification,
} from "antd";
import RegistrarEquipo from "./RegistrarEquipo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { convertLegacyProps } from "antd/es/button";
const Equipos = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [buscar, setBuscar] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    setTitle("Equipos");
    getEquipos();
  }, []);

  const getEquipos = async () => {
    const response = await fetch("http://10.30.1.42:8085/api/v1/equipos");

    const info = await response.json();
    if (info) setEquipos(info.data);
  };

  const columns = [
    {
      title: "Nro",
      dataIndex: "nro",
      align: "center",
    },
    {
      title: "SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      align: "center",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
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
          ) : estado === "NUEVO" || estado === "Nuevo" ? 
            <Tag color="blue">{estado}</Tag> : null}
        </>
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

  const handleEdit = (val) => {
    setIsModalOpen(true);
    setEditar(val);
  };
  const handleDelete = async (id) => {
    const response = await fetch(`http://10.30.1.42:8085/api/v1/equipos/${id}`, {
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
      getEquipos();
    } else {
      notification.error({
        message: confirm.msg,
      });
    }
  };

  const filtrar = () => {
    const filterData = () => {
      // Filtrar solo si al menos uno de los criterios de búsqueda está presente
      if (buscar === ""  && tipo === ""  && estado === "" ) {
        return equipos;
      } else {
        // Filtrar equipos según los criterios proporcionados
        const resultadosFiltrados = equipos.filter((item) => {
          const coincideBuscar =
            buscar
              ? item?.sbn?.toLowerCase().includes(buscar?.toLowerCase()) ||
                item?.marca?.toLowerCase().includes(buscar?.toLowerCase())
              : true;
          const coincideTipo =
            tipo ? item?.tipo?.toLowerCase() === tipo?.toLowerCase() : true;
          const coincideEstado =
            estado ? item?.estado?.toLowerCase() === estado?.toLowerCase() : true;
  
          // Un elemento pasa el filtro si todos los criterios coinciden
          return coincideBuscar && coincideTipo && coincideEstado;
        });
  
        return resultadosFiltrados;
      }
    };
  
    setSearch(filterData());
  };
  
  useEffect(() => {
    filtrar();
  }, [buscar, tipo, estado, equipos]);

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
            gap: "10px",
          }}
        >
          <Search
            placeholder="Buscar"
            style={{ width: "30%" }}
            onChange={(e) => setBuscar(e.target.value)}
          />

          <Select
            className="input-form"
            value={tipo || undefined}
            placeholder={"Tipo de equipo"}
            onChange={(e) => setTipo(e)}
            showSearch
            optionFilterProp="children"
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

          <Select
            className="input-form"
            value={estado || undefined}
            placeholder={"Estado de equipo"}
            onChange={(e) => setEstado(e)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={[
              {
                value: "nuevo",
                label: "Nuevo",
              },
              {
                value: "bueno",
                label: "Bueno",
              },
              {
                value: "regular",
                label: "Regular",
              },
              {
                value: "malo",
                label: "Malo",
              },
            ]}
          />
        </div>
        <div
          style={{ width: "30%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={() => setIsModalOpen(true)}>Registrar</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={search} />
      {isModalOpen && (
        <RegistrarEquipo
          isModalOpen={isModalOpen}
          setIsOpenModal={setIsModalOpen}
          getEquipos={getEquipos}
          editar={editar}
          setEditar={setEditar}
        />
      )}
    </>
  );
};

export default Equipos;
