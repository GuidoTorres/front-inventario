import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Statistic, Table } from "antd";
import React, { useEffect, useState } from "react";
import Grafico from "../Grafico";
import Typography from "antd/es/typography/Typography";
import GraficoBarras from "../../Graficos/GraficoBarras";
import { Tabs } from "antd";

const Dashboard = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  useEffect(() => {
    setTitle("Dashboard");
    getEquipos();
    getEstadisticaPorArea();
  }, []);

  const getEquipos = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/estadisticas`
    );

    const info = await response.json();
    if (info) setEquipos(info);
  };

  const getEstadisticaPorArea = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/equipos/estadistica/dependencias`
    );

    const info = await response.json();
    if (info) setDependencias(info);
  };
  console.log(dependencias);
  const columns = [
    {
      title: "Tipo",
      dataIndex: "tipo",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      align: "center",
    },
  ];
  const columnsDependencias = [
    {
      title: "Dependencia",
      dataIndex: "nombre_dependencia",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      align: "center",
    },
  ];
  const columnsTipoDependencia = [
    {
      title: "Dependencia",
      dataIndex: "nombre_dependencia",
      align: "center",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      align: "center",
    },

    // Agrega más columnas según los tipos que tengas
  ];

  const dataSource = equipos?.totalPorTipoPorDependencia?.flatMap((dep, index) =>
    dep.tipos.map(tipo => ({
      key: `${index}-${tipo.tipo}`, // Clave única para cada fila
      dependencia: dep.dependencia,
      tipo: tipo.tipo,
      cantidad: tipo.cantidad,
    }))
  );

    console.log(dataSource);

  const items = [
    {
      key: "1",
      label: "General",
      children: (
        <Flex vertical gap={10}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}> Monitores</Typography.Title>
                {equipos.monitor ? (
                  <Grafico data={equipos?.monitor} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}>Impresoras</Typography.Title>
                {equipos.impresoras ? (
                  <Grafico data={equipos?.impresoras} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}> Cpu</Typography.Title>

                {equipos.cpu ? (
                  <Grafico data={equipos?.cpu} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}> Laptops</Typography.Title>

                {equipos.laptop ? (
                  <Grafico data={equipos?.laptop} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Typography.Title level={5}>
                  {" "}
                  Equipos por año de ingreso
                </Typography.Title>

                {equipos.anio ? (
                  <GraficoBarras data={equipos?.anio} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      key: "2",
      label: "Cpu",
      children: (
        <Flex vertical gap={10}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}>
                  {" "}
                  Procesadores por Modelo
                </Typography.Title>
                {equipos.procesadores ? (
                  <Grafico data={equipos?.procesadores} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}>
                  {" "}
                  Procesadores por Generación
                </Typography.Title>
                {equipos.cpusPorGeneracion ? (
                  <Grafico data={equipos?.cpusPorGeneracion} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}>Cpus por estado</Typography.Title>
                {equipos.impresoras ? (
                  <Grafico data={equipos?.cpu} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}> Laptops por estado</Typography.Title>

                {equipos.cpu ? (
                  <Grafico data={equipos?.laptop} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      key: "3",
      label: "Impresoras",
      children: (
        <Flex vertical gap={10}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}>
                  {" "}
                  Impresora por Tipo
                </Typography.Title>
                {equipos?.tipoImpresora ? (
                  <Grafico data={equipos?.tipoImpresora} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}>
                  Impresoras por estado
                </Typography.Title>
                {equipos.impresoras ? (
                  <Grafico data={equipos?.impresoras} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}>
                  Impresoras por Suministro
                </Typography.Title>
                {equipos.tipoImpresoraSuministro ? (
                  <Grafico data={equipos?.tipoImpresoraSuministro} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Monitores",
      children: (
        <Flex vertical gap={10}>
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}>
                  {" "}
                  Monitores por Tecnologia
                </Typography.Title>
                {equipos.tipoMonitor ? (
                  <Grafico data={equipos?.tipoMonitor} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Typography.Title level={5}>
                  {" "}
                  Monitores por Tamaño
                </Typography.Title>
                {equipos.tipoMonitor ? (
                  <Grafico data={equipos?.monitorporPulgadas} />
                ) : (
                  <p> Sin registros</p>
                )}
              </Card>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      key: "5",
      label: "Por Área",
      children: (
        <Flex vertical gap={10}>
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <h3>Cantidad por Tipo</h3>
                <Table
                  style={{ marginTop: "10px" }}
                  columns={columns}
                  dataSource={dependencias?.totalPorTipo}
                  pagination={false}
                ></Table>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
              <h3>Cantidad por Dependencia</h3>
                <Table
                  style={{ marginTop: "10px" }}
                  columns={columnsDependencias}
                  dataSource={dependencias?.totalPorDependencia}
                  pagination={false}
                ></Table>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
              <h3>Cantidad por Tipo y Dependencia</h3>
                <Table
                  style={{ marginTop: "10px" }}
                  columns={columnsTipoDependencia}
                  dataSource={dependencias?.totalPorTipoPorDependencia}
                  pagination={true}
                ></Table>
              </Card>
            </Col>
          </Row>
        </Flex>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Dashboard;
