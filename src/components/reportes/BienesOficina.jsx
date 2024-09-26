import React, { useEffect, useState } from "react";
import { Button, Select, Table, Tag } from "antd";

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
  ];

  const filtrar = () => {
    const filterData = () => {
      // Si todos los criterios de búsqueda están vacíos, devolver todos los equipos
      if (
        !dataValues.sede_id &&
        !dataValues.dependencia_id &&
        !dataValues.oficina_id
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

          // Un elemento pasa el filtro si todos los criterios coinciden
          return coincideSede && coincideArea && coincideOficina;
        });

        return resultadosFiltrados;
      }
    };

    setSearch(filterData());
  };

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
  }, [dataValues, equipos]);

  return (
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

          <Button
            type="primary"
            onClick={() =>
              setDataValues({
                
              })
            }
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
        <label htmlFor="">
          <strong>Total de equipos: {search.length}</strong>{" "}
        </label>
      </div>
      <Table columns={columns} dataSource={search} />
    </>
  );
};

export default BienesOficina;
