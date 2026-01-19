import SERVER_API from "./serverAddress";

// קבלת כל רשימת הקפה
const getAllCoffee = async (token) => {
  return await fetch(`${SERVER_API}/api/coffee/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// קבלת קפה לפי ID
const getCoffeeById = async (coffeeId, token) => {
  return await fetch(`${SERVER_API}/api/coffee/${coffeeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// יצירת קפה חדש
const createCoffee = async ({ token, data }) => {
  return await fetch(`${SERVER_API}/api/coffee/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  });
};

const coffeeApi = {
  getAllCoffee,
  getCoffeeById,
  createCoffee
};

export default coffeeApi;