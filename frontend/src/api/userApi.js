import SERVER_API from "./serverAddress";
console.log("SERVER_API =", SERVER_API);
// רישום משתמש חדש
const register = async ({ data }) => {
  return await fetch(`${SERVER_API}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// התחברות משתמש
const login = async (credentials) => {
  return await fetch(`${SERVER_API}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
};

const userApi = {
  register,
  login,
};

export default userApi;