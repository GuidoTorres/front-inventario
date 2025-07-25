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

const ActualizarEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editar, setEditar] = useState();
  const [buscar, setBuscar] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // Nuevo estado para animación de desaparición
  const [disappearingRows, setDisappearingRows] = useState(new Set());

  useEffect(() => {
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
      // Ordenar los equipos por ID descendente
      const equiposOrdenados = enriquecidos.sort((a, b) => b.id - a.id);
      setEquipos(equiposOrdenados);
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
    if (selectedRows.length === 0) {
      notification.warning({
        message: "Selecciona al menos un equipo para actualizar",
      });
      return;
    }

    // Marcar las filas seleccionadas para animación de desaparición
    const selectedKeys = selectedRows.map(row => row.key || row.id);
    setDisappearingRows(new Set(selectedKeys));

    const newData = selectedRows.map((item) => {
      return {
        sbn: item.SBN,
        descripcion: item.DESCRIPCION,
        marca: item.MARCA,
        modelo: item.MODELO,
        fecha_ingreso: dayjs().format('YYYY'),
        estado_conserv: item.ESTADO_CONSERV,
        trabajador_id: item.trabajador_id,
        secuencia: item.secuencia,
        estado: 'Nuevo'
      };
    });

    // Esperar un poco para que se vea la animación antes de hacer la petición
    setTimeout(async () => {
      try {
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
          
          // Limpiar selección
          setSelectedRows([]);
          
          // Esperar un poco más para completar la animación antes de recargar
          setTimeout(() => {
            getEquipos();
            setDisappearingRows(new Set());
          }, 500);
          
        } else {
          notification.error({
            message: confirm.msg,
          });
          setDisappearingRows(new Set());
        }
      } catch (error) {
        notification.error({
          message: "Error al actualizar equipos",
        });
        setDisappearingRows(new Set());
      }
    }, 100);
  };

  // Función para obtener el estilo de fila con animación de desaparición
  const getRowClassName = (record) => {
    const key = record.key || record.id;
    if (disappearingRows.has(key)) {
      return 'row-disappear-animation';
    }
    return '';
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
      {/* Estilos CSS para la animación de desaparición */}
      <style jsx>{`
        .row-disappear-animation {
          animation: fadeOutSlide 1s ease-in-out forwards;
        }
        
        @keyframes fadeOutSlide {
          0% { 
            opacity: 1; 
            transform: translateX(0) scale(1);
            background-color: #fff;
          }
          30% { 
            background-color: #52c41a;
            transform: scale(1.02);
          }
          70% { 
            opacity: 0.3; 
            transform: translateX(-20px) scale(0.98);
            background-color: #f6ffed;
          }
          100% { 
            opacity: 0; 
            transform: translateX(-50px) scale(0.95);
            height: 0;
            padding: 0;
            margin: 0;
          }
        }
      `}</style>

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
        rowClassName={getRowClassName}
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
