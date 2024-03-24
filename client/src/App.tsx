import React from "react";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RestaurantDetails from "./components/RestaurantDetails";
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <NavBar />
      <RestaurantDetails />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
