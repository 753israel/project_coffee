import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");

    // רענון קטן כדי שהתפריט יתעדכן
    window.location.reload();
  }, [navigate]);

  return null;
}

export default Logout;