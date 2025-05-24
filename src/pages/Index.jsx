import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Themes from "../components/themes";

const Index = () => {
  const [active, setActive] = useState("me");
  const location = useLocation();
  useEffect(() => {});
  return (
    <div className="sidebar">
      <div className="sidebarheader">
        <Link to={"/"} className="logo">
          hr
        </Link>
        <Themes />
      </div>
      <div className="side-nav">
        <Link
          to={"/"}
          className={`item ${location.pathname == "/" ? "active" : ""}`}
        >
          <i className="bx bx-planet"></i>
          <p>me</p>
        </Link>
        <Link
          to={"/tech"}
          className={`item ${location.pathname == "/tech" ? "active" : ""}`}
        >
          <i className="bx bx-coin-stack"></i>
          <p>tech-stack</p>
        </Link>
        <Link
          to={"/projects"}
          className={`item ${location.pathname == "/projects" ? "active" : ""}`}
        >
          <i className="bx bx-cube-alt"></i>
          <p>projects</p>
        </Link>
        <Link
          to={"/other"}
          className={`item ${location.pathname == "/other" ? "active" : ""}`}
        >
          <i className="bx bx-game"></i>
          <p>other-stuffs</p>
        </Link>
        <Link
          to={"/connect"}
          className={`item ${location.pathname == "/connect" ? "active" : ""}`}
        >
          <i className="bx bx-send"></i>
          <p>connect-with-me</p>
        </Link>
      </div>
      <div className="footer">
        <p>Built Using React+Vite with plain CSS</p>
        <p>&copy; {new Date().getFullYear()} HrithikXD</p>
      </div>
    </div>
  );
};

export default Index;
