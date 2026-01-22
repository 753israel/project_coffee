import Menu from "./Menu";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Menu />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;