import SERVER_API from "../api/serverAddress";

// קבלת כל ההזמנות של משתמש
const getOrdersByUser = async (userId, token) => {
  return await fetch(`${SERVER_API}/api/coffee/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

// יצירת הזמנה חדשה
const createOrder = async ({ coffeeId, token, data }) => {
  return await fetch(`${SERVER_API}/api/coffee/${coffeeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};

const orderApi = {
  getOrdersByUser,
  createOrder
};

export default orderApi;