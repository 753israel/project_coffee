import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await userApi.login({
      data: { email, password }
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "שגיאה בהתחברות");
      return;
    }

    // שמירת טוקן ותפקיד
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.user.role);

    alert("התחברת בהצלחה!");

    // ניווט לפי תפקיד
    if (result.user.role === "admin") {
      navigate("/coffee/new");
    } else {
      navigate("/coffee");
    }
  };

  return (
    
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={styles.title}>התחברות</h2>

        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          התחבר
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  form: {
    width: "350px",
    padding: "25px",
    borderRadius: "10px",
    background: "#6f4e37",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "95%",
    padding: "12px",
    background: "#6f4e37",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Login;