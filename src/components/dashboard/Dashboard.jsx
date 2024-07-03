import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import Grafico from "../Grafico";
import Typography from "antd/es/typography/Typography";
import GraficoBarras from "../../Graficos/GraficoBarras";

const Dashboard = ({ setTitle }) => {
  const [equipos, setEquipos] = useState([]);
  useEffect(() => {
    setTitle("Dashboard");
    getEquipos();
  }, []);
  console.log(equipos.impresoras);
  const getEquipos = async () => {
    const response = await fetch(
      "http://localhost:8085/api/v1/equipos/estadisticas"
    );

    const info = await response.json();
    if (info) setEquipos(info);
  };
  return (
    <Flex vertical gap={10}>
            <Row gutter={16}>
        <Col span={6}>
          <Card bordered={true}>
            <Typography.Title level={5}>
              {" "}
              Monitores Sector Cayma
            </Typography.Title>
            {equipos.monitor ? (
              <Grafico data={equipos?.monitor} />
            ) : (
              <p> Sin registros</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Typography.Title level={5}>
              Impresoras Sector Cayma
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
            <Typography.Title level={5}> Cpu Sector Cayma</Typography.Title>

            {equipos.cpu ? (
              <Grafico data={equipos?.cpu} />
            ) : (
              <p> Sin registros</p>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Typography.Title level={5}> Laptops Sector Cayma</Typography.Title>

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
  );
};

export default Dashboard;
