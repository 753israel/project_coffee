import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CoffeeList from "./Pages/CoffeeList";
import Register from "./Pages/Register";
import CoffeePage from "./Pages/CoffeePage";
import CreateCoffee from "./Pages/CreateCoffee";
import CoffeeSearch from "./Pages/CoffeeSearch";
import Layout from "./components/Layout";
import Logout from "./Pages/Logout";
import OrdersPage from "./Pages/OrdersPage";
import CoffeeOrderPage from "./Pages/CoffeeOrderPage";
import CartPage from "./Pages/CartPage";
import MenuPage from "./Pages/MenuPage";
import "./App.css";

function App() {
  return (
    <Routes>

      {/* עטיפה של כל האפליקציה */}
      <Route path="/" element={<Layout />}>

        {/* עמוד הבית */}
        <Route index element={<Home />} />

        {/* שאר העמודים */}
        <Route path="login" element={<Login />} />
        <Route path="coffee" element={<CoffeeList />} />
        <Route path="register" element={<Register />} />
        <Route path="coffee/:coffeeId" element={<CoffeePage />} />
        <Route path="coffee/new" element={<CreateCoffee />} />
        <Route path="search" element={<CoffeeSearch />} />
        <Route path="logout" element={<Logout />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="order" element={<CoffeeOrderPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/menu" element={<MenuPage />} />

      </Route>
    </Routes>
  );
}

export default App;