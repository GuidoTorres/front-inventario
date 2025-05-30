import React, { useEffect, useState } from "react";
import { Button, Select, Table, Tag, notification } from "antd";
import RegistrarEquipo from "./RegistrarEquipo";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";

// 1. Definimos un diccionario de tipos → palabras clave
const TIPO_KEYWORDS = {
  Impresora: ["IMPRESORA", "PLOTTER"],
  Monitor: ["MONITOR"],
  Laptop: ["LAPTOP", "PORTÁTIL", "NOTEBOOK", "COMPUTADORA PERSONAL PORTATIL	"],
  Teclado: ["TECLADO"],
  Mouse: ["MOUSE", "RATÓN"],
  Servidor: ["SERVIDOR"],
  Proyector: ["PROYECTOR"],
  Cpu: ["CPU", "UNIDAD CENTRAL DE PROCESO"],
  DiscoDuro: ["DISCO DURO"],
  Estabilizador: ["ESTABILIZADOR"],
  Switch: ["SWITCH"],
  Router: ["ROUTER"],
  LectorCd: ["LECTOR DE CD", "LECTORA", "CD-ROM"],
  Telefono: ["TELÉFONO", "TELEFONO"],
  AccessPoint: ["ACCESS POINT", "AP"],
  Scanner: ["ESCANER", "CAPTURADOR DE IMAGEN"],
};

// 2. Función para detectar todos los tipos que aparezcan
function detectTipos(descripcion = "") {
  // Normalizamos: sin tildes y en mayúsculas
  const desc = descripcion
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  // Separamos por -, coma, slash, pipe, etc.
  const partes = desc.split(/[-,\/|]/).map((p) => p.trim());

  const tiposEncontrados = new Set();

  partes.forEach((parte) => {
    for (const [tipo, keys] of Object.entries(TIPO_KEYWORDS)) {
      if (keys.some((k) => parte.includes(k))) {
        tiposEncontrados.add(tipo);
      }
    }
  });

  return Array.from(tiposEncontrados);
}

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

    if (info) {
      const enriquecidos = info?.data?.map((item) => {
        const tipos = detectTipos(item.DESCRIPCION);
        // Si solo quieres un tipo (el primero), podrías hacer:
        // const tipo = tipos[0] || '';
        return {
          ...item,
          tipo: tipos[0], // o un único valor
        };
      });
      setEquipos(enriquecidos);
    }
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
      dataIndex: "CODIGO_ACTIVO",
      align: "center",
    },

    {
      key: "descripcion",
      title: "Descripción",
      dataIndex: "DESCRIPCION",
      align: "center",
    },
    {
      key: "marca",
      title: "Marca",
      dataIndex: "MARCA",
      align: "center",
    },
    {
      key: "modelo",
      title: "Modelo",
      dataIndex: "MODELO",
      align: "center",
    },
    {
      key: "fecha_ingreso",
      title: "Fecha ingreso",
      render: (_, record) => dayjs(record.FECHA_REG).format("DD-MM-YYYY"),
      align: "center",
    },

    {
      key: "estado",
      title: "Estado",
      dataIndex: "estado_conserv",
      align: "center",
      render: (_, record) => {
        let color = "green";
        let text = "Bueno";

        switch (record.ESTADO_CONSERV) {
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
  ];

  const filtrar = () => {
    const filterData = () => {
      // Filtrar solo si al menos uno de los criterios de búsqueda está presente
      if (buscar === "" && tipo === "" && estado === "") {
        return equipos;
      } else {
        // Filtrar equipos según los criterios proporcionados
        const resultadosFiltrados = equipos.filter((item) => {
          const coincideBuscar = buscar
            ? item?.CODIGO_ACTIVO?.toLowerCase().includes(
                buscar?.toLowerCase()
              ) ||
              item?.MARCA?.toLowerCase().includes(buscar?.toLowerCase()) ||
              item?.DESCRIPCION?.toLowerCase().includes(buscar?.toLowerCase())
            : true;
          const coincideTipo = tipo
            ? item?.tipo?.toLowerCase() === tipo?.toLowerCase()
            : true;
          const coincideEstado = estado
            ? item?.ESTADO_CONSERV?.toLowerCase() === estado?.toLowerCase()
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
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/varios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
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

  const expandedRowRenderPrueba = (record) => {
    const columns = [
      {
        title: "Encargado",
        dataIndex: "nombre_completo",
        key: "nombre_completo",
        align: "center",
      },
      {
        title: "Tipo",
        key: "tipo",
        align: "center",
        render: (_, record) => { return <Tag color="green">{record.tipo}</Tag>}
      },
    ];

    return <Table columns={columns} dataSource={[record]} pagination={false} />;
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <label htmlFor="">
          <strong>Total de equipos: {equipos?.length}</strong>{" "}
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
          <Button
            onClick={actualizarEquipos}
            style={{ backgroundColor: "#4f6f52", color: "white" }}
          >
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
        dataSource={search?.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
        expandable={{
          expandedRowRender: (record) => expandedRowRenderPrueba(record),
          defaultExpandedRowKeys: ["0"],
        }}
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
