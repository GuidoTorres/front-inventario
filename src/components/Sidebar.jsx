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

  const [menuId, setMenuId] = useState(1)
  // Función para determinar la clave seleccionada en función de la ruta
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/trabajadores") return 1;
    if (path === "/equipos") return 2;
    if (path === "/unidad") return 3;
    if (path === "/cargos") return 4;
    // if (path === "/mantenimiento") return 5;
    if (path === "/dashboard") return 5;
    return 1; 
  };
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  useEffect(()=>{

    setMenuId(getSelectedKey())
  },[getSelectedKey])


  
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img src={imagen} alt="autodema" width={"90%"} height={"90%"} />
        </div>
      </Flex>

      <Menu
        mode="inline"
        defaultSelectedKeys={[menuId]}
        className="menu-bar"
        items={[
          { key: "/trabajadores", icon: <UserOutlined />, label: "Trabajadores" },
          { key: "/equipos", icon: <LaptopOutlined />, label: "Equipos" },
          { key: "/unidad", icon: <ApartmentOutlined />, label: "Unidad" },
          { key: "/cargos", icon: <SolutionOutlined />, label: "Cargos" },
          // { key: "/mantenimiento", icon: <ToolOutlined />, label: "Mantenimiento" },
          { key: "/dashboard", icon: <AreaChartOutlined />, label: "Dashboard" },
        ]}
        onClick={handleMenuClick}
      />
    </>
  );
};

export default Sidebar;
