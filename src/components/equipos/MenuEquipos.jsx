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
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section
        style={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => navigate("/equipos")}
      >
        <div
          style={{
            width: "50%",
            height: "70%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

          }}
        >
          <LaptopOutlined style={{ fontSize: "120px" }} />
        </div>
        <strong style={{ marginTop: "20px" }}>
          <label htmlFor=""> Equipos</label>
        </strong>
      </section>
      <section
        style={{
          width: "40%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => navigate("/actualizar/equipos")}
      >
        <div
          style={{
            width: "50%",
            height: "70%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
          }}
        >
          <SyncOutlined style={{ fontSize: "120px" }} />
        </div>
        <strong style={{ marginTop: "20px" }}>
          <label htmlFor="">Actualizar equipos</label>
        </strong>
      </section>
    </div>
  );
};

export default MenuEquipos;
