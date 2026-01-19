import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CoffeeList from "./Pages/CoffeeList";
import Register from "./Pages/Register";
import CoffeePage from "./Pages/CoffeePage";
import CreateCoffee from "./Pages/CreateCoffee";
import CoffeeSearch from "./Pages/CoffeeSearch";

function App() {

  const role = localStorage.getItem("role"); // "admin" או "user"

  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* קודם NEW */}
        <Route path="/coffee/new" element={<CreateCoffee />} />

        {/* אחר כך ID */}
        <Route path="/coffee/:coffeeId" element={<CoffeePage />} />

        {/* רשימת קפה */}
        <Route path="/coffee" element={<CoffeeList />} />

        <Route path="/search" element={<CoffeeSearch />} />
      </Routes>
    </>
  );
}

export default App;