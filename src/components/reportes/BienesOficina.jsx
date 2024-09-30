import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Select, Statistic, Table, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const BienesOficina = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [sede, setSede] = useState([]);
  const [dependencia, setDependencia] = useState([]);
  const [ubicacion, setUbicacion] = useState([]);
  const [area, setArea] = useState([]);
  const [oficina, setOficina] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  const [dataValues, setDataValues] = useState({
    sede_id: "",
    dependencia_id: "",
    oficina_id: "",
  });

  const [search, setSearch] = useState([]);

  useEffect(() => {
    setTitle("Equipos");
    getEquipos();
    getSedes();
    getDependencias();
    getUbicaciones();
  }, []);

  const getEquipos = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/equipos/sede`);

    const info = await response.json();
    if (info) setEquipos(info.data);
  };

  const getSedes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/sedes`);

    const info = await response.json();
    if (info) setSede(info.data);
  };
  const getDependencias = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/dependencia`);

    const info = await response.json();
    if (info) setDependencia(info.data);
  };

  const getUbicaciones = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/subdependencias`
    );

    const info = await response.json();
    if (info) setUbicacion(info.data);
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
      title: "Usuario",
      dataIndex: "usuario_actual",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      align: "center",
      render: (_, record) => (
        <>
          {record.estado_conserv === "1" || record.estado_conserv === "1" ? (
            <Tag color="cyan">Bueno</Tag>
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
  ];

  const filtrar = () => {
    const filterData = () => {
      // Si todos los criterios de búsqueda están vacíos, devolver todos los equipos
      if (
        !dataValues.sede_id &&
        !dataValues.dependencia_id &&
        !dataValues.oficina_id &&
        !tipo
      ) {
        return equipos;
      } else {
        // Filtrar equipos según los criterios proporcionados
        const resultadosFiltrados = equipos.filter((item) => {
          const coincideSede = dataValues.sede_id
            ? dataValues.sede_id == item.sede_id
            : true;
          const coincideArea = dataValues.dependencia_id
            ? dataValues.dependencia_id == item.dependencia_id
            : true;
          const coincideOficina = dataValues.oficina_id
            ? dataValues.oficina_id == item.sub_dependencia_id
            : true;
          const coincidenciaTipo = tipo ? tipo == item.tipo : true;

          // Un elemento pasa el filtro si todos los criterios coinciden
          return (
            coincideSede && coincideArea && coincideOficina && coincidenciaTipo
          );
        });

        return resultadosFiltrados;
      }
    };
    const resultados = filterData();

    // Contar los registros por tipo y convertirlos a un array de objetos { titulo, cantidad }
    const conteoPorTipo = resultados.reduce((acc, item) => {
      const { tipo } = item;
      if (acc[tipo]) {
        acc[tipo] += 1; // Incrementar el conteo si el tipo ya existe
      } else {
        acc[tipo] = 1; // Inicializar el conteo si el tipo no existe
      }
      return acc;
    }, {});

    // Convertir el objeto de conteos en un array de { titulo, cantidad }
    const estadisticasArray = Object.keys(conteoPorTipo).map((tipo) => ({
      titulo: tipo,
      cantidad: conteoPorTipo[tipo],
    }));

    // Actualizar el estado con las estadísticas
    setEstadisticas(estadisticasArray);

    setSearch(filterData());
  };
  console.log(estadisticas);
  const filtrarSedes = () => {
    // Filtrar dependencias según la sede seleccionada
    const filterAreas = dependencia.filter(
      (item) => item.sede_id == dataValues.sede_id
    );

    // Si hay dependencias que coinciden con la sede, actualiza las oficinas
    if (filterAreas.length > 0) {
      setArea(filterAreas); // Establecer oficinas basadas en la sede
    } else {
      setArea([]); // Limpiar oficinas si no hay coincidencias
    }

    // Filtrar oficinas según la sub dependencia seleccionada
    const filterOficina = ubicacion.filter(
      (item) => item.dependencia_id == dataValues.dependencia_id
    );

    if (filterOficina.length > 0) {
      setOficina(filterOficina); // Sobrescribir oficinas si hay coincidencias con la sub dependencia
    }
  };

  useEffect(() => {
    // Asegúrate de que la sede y dependencias estén definidas antes de filtrar
    filtrarSedes();
  }, [dataValues, sede, dependencia, ubicacion]);

  useEffect(() => {
    filtrar();
  }, [dataValues, equipos, tipo]);

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

  const ordenPersonalizado = ["Monitor", "Cpu", "Laptop", "Impresora", "Telefono", "Escaner"];

  return (
    <>
      <Row gutter={16} style={{ marginTop: "-20px" }}>
        {estadisticas &&
          estadisticas
            .filter(
              (item) =>
                item.titulo !== "Proyector" &&
                item.titulo !== "Estabilizador" &&
                item.titulo !== "Switch" &&
                item.titulo !== "Teclado" &&
                item.titulo !== "Mouse"
            )
            .sort(
              (a, b) =>
                ordenPersonalizado.indexOf(a.titulo) -
                ordenPersonalizado.indexOf(b.titulo)
            )
            .map((item, index) => (
              <Col span={3} key={index}>
                <Card bordered={true}>
                  <Statistic
                    title={item?.titulo}
                    value={item?.cantidad}
                    valueStyle={{
                      color: "#4f6f52",
                    }}
                  />
                </Card>
              </Col>
            ))}
      </Row>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
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
          <Select
            className="input-form"
            value={dataValues.sede_id || undefined}
            placeholder={"Sedes"}
            style={{ width: "300px" }}
            onChange={(e) =>
              setDataValues((value) => ({ ...value, sede_id: e }))
            }
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={sede.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
          />
          <Select
            className="input-form"
            value={dataValues.dependencia_id || undefined}
            style={{ width: "300px" }}
            placeholder={"Áreas"}
            onChange={(e) =>
              setDataValues((value) => ({ ...value, dependencia_id: e }))
            }
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={area?.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
          />

          <Select
            className="input-form"
            value={dataValues.oficina_id || undefined}
            placeholder={"Oficinas"}
            style={{ width: "300px" }}
            onChange={(e) =>
              setDataValues((value) => ({ ...value, oficina_id: e }))
            }
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={oficina?.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
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
            options={optionsFilter.map((item) => item)}
          />

          <Button
            style={{ backgroundColor: "#4f6f52", color: "white" }}
            onClick={() => {
              setDataValues({});
              setTipo("");
            }}
          >
            Limpiar Filtros
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
        <Tag color="#4f6f52">Total de equipos: {search.length}</Tag>
        {/* <label htmlFor="">
          <strong>Total de equipos: {search.length}</strong>{" "}
        </label> */}
      </div>
      <Table
        columns={columns}
        dataSource={search}
        style={{ marginTop: "10px" }}
      />
    </>
  );
};

export default BienesOficina;
