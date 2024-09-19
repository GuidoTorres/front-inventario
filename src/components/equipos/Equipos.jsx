import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Popconfirm,
  Select,
  Table,
  Tag,
  notification,
  Card,
  Col,
  Row,
  Statistic,
} from "antd";
import RegistrarEquipo from "./RegistrarEquipo";
import {
  DeleteOutlined,
  EditOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Tabs } from "antd";
const Equipos = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [buscar, setBuscar] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState([]);
  const [buscar2, setBuscar2] = useState("");
  const [search2, setSearch2] = useState([]);
  const [tipo2, setTipo2] = useState("");
  const [estado2, setEstado2] = useState("");

  const [inventariados, setInventariados] = useState([]);

  useEffect(() => {
    setTitle("Equipos");
    getEquipos();
    getEquiposInventariados();
  }, []);

  const getEquipos = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/equipos`);

    const info = await response.json();
    if (info) setEquipos(info.data);
  };
  const getEquiposInventariados = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/inventariados`
    );

    const info = await response.json();
    if (info) setInventariados(info.data);
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
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
    },
    {
      title: "Marca",
      dataIndex: "marca",
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
      render: (_, record) => (
        <>
          {record.estado_conserv === "1" || record.estado_conserv === "1" ? (
            <Tag color="green">Bueno</Tag>
          ) : record.estado_conserv === "2" || record.estado_conserv === "2" ? (
            <Tag color="blue">Regular</Tag>
          ) : record.estado_conserv === "3" || record.estado_conserv === "3" ? (
            <Tag color="volcano">Malo</Tag>
          ) : record.estado_conserv === "4" || record.estado_conserv === "4" ? (
            <Tag color="red">Muy Malo</Tag>
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
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/${id}`,
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
              item?.descripcion
                ?.toLowerCase()
                .includes(buscar?.toLowerCase()) ||
              item?.modelo?.toLowerCase().includes(buscar?.toLowerCase())
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
  const filtrar2 = () => {
    const filterData = () => {
      // Filtrar solo si al menos uno de los criterios de búsqueda está presente
      if (buscar2 === "" && tipo2 === "" && estado2 === "") {
        return inventariados;
      } else {
        // Filtrar equipos según los criterios proporcionados
        const resultadosFiltrados = inventariados.filter((item) => {
          const coincideBuscar = buscar2
            ? item?.sbn?.toLowerCase().includes(buscar2?.toLowerCase()) ||
              item?.marca?.toLowerCase().includes(buscar2?.toLowerCase()) ||
              item?.descripcion
                ?.toLowerCase()
                .includes(buscar2?.toLowerCase()) ||
              item?.modelo?.toLowerCase().includes(buscar2?.toLowerCase())
            : true;
          const coincideTipo = tipo2
            ? item?.tipo?.toLowerCase() === tipo2?.toLowerCase()
            : true;
          const coincideEstado = estado2
            ? item?.estado?.toLowerCase() === estado2?.toLowerCase()
            : true;

          // Un elemento pasa el filtro si todos los criterios coinciden
          return coincideBuscar && coincideTipo && coincideEstado;
        });

        return resultadosFiltrados;
      }
    };

    setSearch2(filterData());
  };

  useEffect(() => {
    filtrar();
  }, [buscar, tipo, estado, equipos]);

  useEffect(() => {
    filtrar2();
  }, [buscar2, tipo2, estado2, equipos]);

  const optionsFilter = [
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
  ];

  const items = [
    {
      key: "1",
      label: "Total de equipos",
      children: (
        <>
          <div
            style={{
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
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear
                options={optionsFilter.map((item) => item)}
              />

              <Select
                className="input-form"
                value={estado || undefined}
                placeholder={"Estado de equipo"}
                onChange={(e) => setEstado(e)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear
                options={optionsFilter.map((item) => item)}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={() => setIsModalOpen(true)}>Registrar</Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >
            <label htmlFor="">
              <strong>Total de equipos: {search.length}</strong>{" "}
            </label>
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
      ),
    },
    {
      key: "2",
      label: "Equipos Inventariados",
      children: (
        <>
          <div
            style={{
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
                onChange={(e) => setBuscar2(e.target.value)}
              />

              <Select
                className="input-form"
                value={tipo || undefined}
                placeholder={"Tipo de equipo"}
                onChange={(e) => setTipo2(e)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear
                options={optionsFilter.map((item) => item)}
              />

              <Select
                className="input-form"
                value={estado || undefined}
                placeholder={"Estado de equipo"}
                onChange={(e) => setEstado2(e)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear
                options={optionsFilter.map((item) => item)}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={() => setIsModalOpen(true)}>Registrar</Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >
            <label htmlFor="">
              <strong>Total de equipos: {search2.length}</strong>{" "}
            </label>
          </div>
          <Table columns={columns} dataSource={search2} />
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
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} style={{ marginTop: "-25px" }} />
    </>
  );
};

export default Equipos;
