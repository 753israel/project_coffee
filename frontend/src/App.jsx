import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CoffeeList from "./Pages/CoffeeList";
import CoffeePage from "./Pages/CoffeePage";
import CreateCoffee from "./Pages/CreateCoffee";
import CoffeeSearch from "./Pages/CoffeeSearch";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coffee/new" element={<CreateCoffee />} />
        <Route path="/coffee/:coffeeId" element={<CoffeePage />} />
        <Route path="/coffee" element={<CoffeeList />} />
        <Route path="/search" element={<CoffeeSearch />} />
      </Routes>
    </Layout>
  );
}

export default App;