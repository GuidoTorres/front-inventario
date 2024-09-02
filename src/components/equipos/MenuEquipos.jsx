import { LaptopOutlined, SyncOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuEquipos = ({ setTitle }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Equipos");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "20px",
      }}
    >
      <section
        style={{ height: "250px", cursor: "pointer" }}
        onClick={() => navigate("/equipos")}
      >
        <div
          style={{
            borderRadius: "50%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            height: "200px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <LaptopOutlined style={{ fontSize: "120px" }} />
        </div>
        <p htmlFor="" style={{ marginTop: "10px", fontSize: "15px" }}>
          <strong>Equipos</strong>
        </p>
      </section>

      <section
        style={{ height: "250px", cursor: "pointer" }}
        onClick={() => navigate("/actualizar/equipos")}
      >
        <div
          style={{
            borderRadius: "50%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            height: "200px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <SyncOutlined style={{ fontSize: "120px" }} />
        </div>
        <p htmlFor="" style={{ marginTop: "10px", fontSize: "15px" }}>
          {" "}
          <strong>Actualizar equipos</strong>
        </p>
      </section>
    </div>
  );
};

export default MenuEquipos;
