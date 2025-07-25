import React, { useEffect, useState } from "react";
import {
  Badge, // Importar Badge
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
import { useDebounce } from "../../hooks/useDebounce";
import dayjs from 'dayjs'; // Importar dayjs

const Equipos = () => {
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
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(buscar, 500);
  const debouncedSearch2 = useDebounce(buscar2, 500);

  // ✅ Agregar estados para paginación
  // ✅ Cambiar solo los estados de paginación del frontend a 10
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // ✅ Cambiar de 50 a 10
    total: 0,
  });
  const [inventariadosPagination, setInventariadosPagination] = useState({
    current: 1,
    pageSize: 10, // ✅ Cambiar de 50 a 10
    total: 0,
  });

  useEffect(() => {
    getEquiposData(1, pagination.pageSize, debouncedSearch, tipo, estado);
    getInventariadosData(1, inventariadosPagination.pageSize, debouncedSearch2, tipo2, estado2);
  }, []);

  useEffect(() => {
    getEquiposData(1, pagination.pageSize, debouncedSearch, tipo, estado);
  }, [debouncedSearch, tipo, estado]);

  useEffect(() => {
    getInventariadosData(1, inventariadosPagination.pageSize, debouncedSearch2, tipo2, estado2);
  }, [debouncedSearch2, tipo2, estado2]);


  // ✅ Actualizar la función getEquiposData
  const getEquiposData = async (page = 1, pageSize = 10, search = '', tipo = '', estado = '') => { // ✅ Cambiar de 50 a 10
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', pageSize);
      if (search) params.append('search', search);
      if (tipo) params.append('tipo', tipo);
      if (estado) params.append('estado', estado);

      const response = await fetch(`${process.env.REACT_APP_BASE}/equipos?${params.toString()}`);
      const equiposInfo = await response.json();

      if (equiposInfo) {
        setEquipos(equiposInfo.data);
        setSearch(equiposInfo.data);
        setPagination({
          current: equiposInfo.pagination?.page || 1,
          pageSize: equiposInfo.pagination?.limit || 10, // ✅ Cambiar de 50 a 10
          total: equiposInfo.pagination?.total || 0,
        });
      }
    } catch (error) {
      console.error("Error al obtener datos de equipos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInventariadosData = async (page = 1, pageSize = 10, search = '', tipo = '', estado = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', pageSize);
      if (search) params.append('search', search);
      if (tipo) params.append('tipo', tipo);
      if (estado) params.append('estado', estado);

      const response = await fetch(`${process.env.REACT_APP_BASE}/equipos/inventariados?${params.toString()}`);
      const inventariadosInfo = await response.json();

      if (inventariadosInfo) {
        setInventariados(inventariadosInfo.data);
        setSearch2(inventariadosInfo.data);
        setInventariadosPagination({
          current: inventariadosInfo.pagination?.page || 1,
          pageSize: inventariadosInfo.pagination?.limit || 10, // ✅ Cambiar de 50 a 10
          total: inventariadosInfo.pagination?.total || 0,
        });
      }
    } catch (error) {
      console.error("Error al obtener datos de inventariados:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nro",
      dataIndex: "nro",
      align: "center",
      render: (text, record) => {
        const now = dayjs();
        const createdAt = dayjs(record.createdAt);
        const updatedAt = dayjs(record.updatedAt);
        const diffCreatedHours = now.diff(createdAt, 'hour');
        const diffUpdatedHours = now.diff(updatedAt, 'hour');

        let badgeStatus = null;

        if (diffCreatedHours <= 24) {
          badgeStatus = "success"; // Verde para nuevos
        } else if (diffUpdatedHours <= 24) {
          badgeStatus = "warning"; // Amarillo para actualizados
        }

        return (
          <Flex align="center" justify="center" gap={8}>
            <span>{text}</span>
            {badgeStatus && <Badge status={badgeStatus} style={{ transform: 'scale(1.5)' }} />}
          </Flex>
        );
      },
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
            title="Eliminar equipo"
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
      getEquiposData();
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

  const optionsFilterEstado = [
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
                options={optionsFilterEstado.map((item) => item)}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor: "#4f6f52", color: "white" }}
              >
                Registrar
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >
            <Tag color="#4f6f52">Total de equipos: {pagination.total}</Tag>
          </div>
          <Table 
            columns={columns} 
            dataSource={search} // Usar directamente `search` que viene de la API
            loading={loading}
            style={{marginTop:"5px"}}
              // En ambas tablas, actualizar la configuración de paginación:
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100'], // ✅ Opciones de tamaño de página
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} de ${total} equipos`,
                onChange: (page, pageSize) => {
                  getEquiposData(page, pageSize, buscar, tipo, estado);
                },
                onShowSizeChange: (current, size) => {
                  getEquiposData(1, size, buscar, tipo, estado);
                },
              }}
          />
          {isModalOpen && (
            <RegistrarEquipo
              isModalOpen={isModalOpen}
              setIsOpenModal={setIsModalOpen}
              getEquipos={getEquiposData}
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
                options={optionsFilterEstado.map((item) => item)}
              />
            </div>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor: "#4f6f52", color: "white" }}
              >
                Registrar
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >
            <Tag color="#4f6f52">Total de equipos: {inventariadosPagination.total}</Tag>
          </div>
          <Table
            columns={columns}
            dataSource={search2.length > 0 ? search2 : inventariados}
            style={{ marginTop: "5px" }}
            pagination={{
              current: inventariadosPagination.current,
              pageSize: inventariadosPagination.pageSize,
              total: inventariadosPagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} de ${total} equipos inventariados`,
              onChange: (page, pageSize) => {
                getEquiposData(page, pageSize);
              },
              onShowSizeChange: (current, size) => {
                getEquiposData(1, size);
              },
            }}
          />
          {isModalOpen && (
            <RegistrarEquipo
              isModalOpen={isModalOpen}
              setIsOpenModal={setIsModalOpen}
              getEquipos={getEquiposData}
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
