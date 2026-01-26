import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Menu />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;