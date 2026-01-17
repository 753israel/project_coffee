import { useState } from "react";
import userApi from "../api/userApi";
import useApiStatus from "../hooks/useApiStatus";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { call, error, isLoading } = useApiStatus();

  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await call({
      callbackApi: userApi.login,
      data: user,
    });

    console.log("SERVER RESPONSE:", result);

    if (result?.token) {
      sessionStorage.setItem("token", result.token);
      console.log("Logged in successfully");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">מייל:</label>
      <input
        type="email"
        required
        name="email"
        onChange={onChange}
        placeholder="Enter your email"
        style={{ direction: "ltr" }}
      />

      <label htmlFor="password">סיסמא:</label>
      <input
        type="password"
        required
        name="password"
        onChange={onChange}
        placeholder="Enter your password"
        style={{ direction: "rtl" }}
      />

      <button disabled={isLoading}>
        {isLoading ? "טוען..." : "LOGIN"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;