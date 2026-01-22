import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.login({ email, password });
      const text = await response.text();
      const result = JSON.parse(text);

      if (!response.ok) {
        alert(result.error || "שגיאה בהתחברות");
        return;
      }

      // שמירת המשתמש והטוקן
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      // מעבר לדף "הקפה שלנו"
      navigate("/coffee");

      // רענון כדי לעדכן את התפריט
      window.location.reload();

    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("שגיאת תקשורת מול השרת");
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
          required
        />

        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
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
    color: "white",
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
    background: "#4b2e2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Login;