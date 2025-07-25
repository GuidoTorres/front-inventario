import React, { useContext, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles/mainPage.css";
import HeaderContent from "../components/HeaderContent";
import TablaTrabajador from "../components/trabajador/TablaTrabajador";
import Equipos from "../components/equipos/Equipos";
import { Routes, Route, Navigate } from "react-router-dom";
import Areas from "../components/areas/Areas";
import Mantenimientos from "../components/mantenimientos/Mantenimientos";
import Dashboard from "../components/dashboard/Dashboard";
import Cargos from "../components/cargos/Cargos";

import { useNavigate, useLocation } from "react-router-dom";
import Login from "../components/login/Login";
import { InventarioContext } from "../context/InventarioContext";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import MenuEquipos from "../components/equipos/MenuEquipos";
import ActualizarEquipos from "../components/equipos/ActualizarEquipos";
import BienesOficina from "../components/reportes/BienesOficina";
const { Sider, Header, Content } = Layout;

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const { setIsLogged, isLogged } = useContext(InventarioContext);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/actualizar/equipos')) return 'Actualizar Equipos';
    if (path.includes('/equipos')) return 'Equipos';
    if (path.includes('/trabajadores')) return 'Trabajadores';
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/dependencias')) return 'Dependencias';
    if (path.includes('/subdependencias')) return 'Subdependencias';
    if (path.includes('/reportes')) return 'Reportes';
    return 'Inventario'; // Título por defecto
  };

  return (
    <Layout>
      {!isLogged && !localStorage.getItem("token") ? (
        <Login setIsLogged={setIsLogged} />
      ) : (
        <>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider"
          >
            {" "}
            <Sidebar />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="triger-btn"
            />
          </Sider>

          <Layout>
            <Header className="header">
              <HeaderContent title={getTitle()} />
            </Header>
            <Content className="content">
              <Routes>
                <Route path="/" element={<Navigate to="/equipos" />} />
                <Route
                  path="/trabajadores"
                  element={
                    <ProtectedRoute>
                      <TablaTrabajador />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/menu/equipos"
                  element={
                    <ProtectedRoute>
                      <MenuEquipos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/actualizar/equipos"
                  element={
                    <ProtectedRoute>
                      <ActualizarEquipos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipos"
                  element={
                    <ProtectedRoute>
                      <Equipos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subdependencias"
                  element={
                    <ProtectedRoute>
                      <Areas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dependencias"
                  element={
                    <ProtectedRoute>
                      <Cargos />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/mantenimiento"
                  element={<ProtectedRoute><Mantenimientos /></ProtectedRoute>}
                /> */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                                <Route
                  path="/reportes"
                  element={
                    <ProtectedRoute>
                      <BienesOficina />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default MainPage;
