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
import "./App.css";

function App() {
  return (

    
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coffee" element={<CoffeeList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coffee/:coffeeId" element={<CoffeePage />} />
        <Route path="/coffee/new" element={<CreateCoffee />} />
        <Route path="/search" element={<CoffeeSearch />} />
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
      </Layout>
    

  );
}

export default App;