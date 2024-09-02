import React, { useEffect, useState } from "react";
import { Flex, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  ApartmentOutlined,
  ToolOutlined,
  AreaChartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import "./styles/sidebar.css";
import imagen from "../assets/autodema.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Usar un string que corresponda a la 'key' del ítem del menú
  const [selectedKey, setSelectedKey] = useState("");

  // Actualizar la clave seleccionada en función de la ruta actual
  useEffect(() => {
    const path = location.pathname;
    setSelectedKey(path);
  }, [location]);

  const handleMenuClick = (e) => {
    // Maneja la selección del menú aquí
    const key = e.key;
  
    // Si tienes varias rutas que deberían seleccionar el mismo ítem
    if (key === "/equipos" || key === "/actualizar/equipos") {
      setSelectedKey("/menu/equipos");
    } else {
      setSelectedKey(key);
    }
  
    // Navega a la ruta seleccionada
    navigate(key);
  };

  
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img src={imagen} alt="autodema" width={"90%"} height={"90%"} />
        </div>
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        className="menu-bar"
        items={[
          { key: "/trabajadores", icon: <UserOutlined />, label: "Trabajadores" },
          { key: "/menu/equipos", icon: <LaptopOutlined />, label: "Equipos" },
          { key: "/dependencias", icon: <SolutionOutlined />, label: "Dependencias" },
          { key: "/subdependencias", icon: <ApartmentOutlined />, label: "Sub Dependencias" },
          // { key: "/mantenimiento", icon: <ToolOutlined />, label: "Mantenimiento" },
          { key: "/dashboard", icon: <AreaChartOutlined />, label: "Dashboard" },
        ]}
        onClick={handleMenuClick}
      />
    </>
  );
};

export default Sidebar;
