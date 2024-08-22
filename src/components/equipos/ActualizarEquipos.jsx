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
import dayjs from "dayjs";

const ActualizarEquipos = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [buscar, setBuscar] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setTitle("Actualizar Equipos");
    getEquipos();
  }, []);

  const getEquipos = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/bienes`
    );

    const info = await response.json();
    if (info) setEquipos(info.data);
  };

  const columns = [
    {
      title: "Nro",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      key: "sbn",
      title: "SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      key: "secuencia",
      title: "Secuencia",
      dataIndex: "secuencia",
      align: "center",
    },
    {
      key: "descripcion",
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
    },
    {
      key: "fecha_ingreso",
      title: "Fecha ingreso",
      render: (_, record) => dayjs(record.fecha_ingreso).format("DD-MM-YYYY"),
      align: "center",
    },
    {
      key: "estado",
      title: "Estado",
      dataIndex: "estado",
      align: "center",
      render: (_, record) => {
        let color = "green";
        let text = "Bueno";

        switch (record.estado_conserv) {
          case "1":
            color = "green";
            text = "Bueno";
            break;
          case "2":
            color = "blue";
            text = "Regular";
            break;
          case "3":
            color = "volcano";
            text = "Malo";
            break;
          case "4":
            color = "red";
            text = "Muy Malo";
            break;
          case "5":
            color = "blue";
            text = "Nuevo";
            break;
          case "6":
            color = "purple";
            text = "Chatarra";
            break;
          case "7":
            color = "magenta";
            text = "RAEE";
            break;
          default:
            return null;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      key: "acciones",
      title: "Acciones",
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={2}>
          <Button onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Eliminar trabajador"
            description="¿Estás seguro de eliminar?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí"
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
    const response = await fetch(
      `http://10.30.1.43:8085/api/v1/equipos/${id}`,
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
      if (buscar === "" && tipo === "" && estado === "") {
        return equipos;
      } else {
        // Filtrar equipos según los criterios proporcionados
        const resultadosFiltrados = equipos.filter((item) => {
          const coincideBuscar = buscar
            ? item?.sbn?.toLowerCase().includes(buscar?.toLowerCase()) ||
              item?.marca?.toLowerCase().includes(buscar?.toLowerCase()) ||
              item?.descripcion?.toLowerCase().includes(buscar?.toLowerCase())
            : true;
          const coincideTipo = tipo
            ? item?.tipo?.toLowerCase() === tipo?.toLowerCase()
            : true;
          const coincideEstado = estado
            ? item?.estado?.toLowerCase() === estado?.toLowerCase()
            : true;

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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const actualizarEquipos = async () => {
    const newData = selectedRows.map(({ id, ...rest }) => rest);
    const response = await fetch(`${process.env.REACT_APP_BASE}/equipos/varios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <label htmlFor="">
          <strong>Total de equipos: {equipos.length}</strong>{" "}
        </label>
      </div>
      <div
        style={{
          marginTop: "10px",
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
        </div>
        <div
          style={{ width: "30%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="primary" onClick={actualizarEquipos}>
            Guardar
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={search.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
      />
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

export default ActualizarEquipos;
