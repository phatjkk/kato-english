import React from "react";
import Home from "./pages/Home";
import Header from "./pages/Components/Header";
import Footer from "./pages/Components/Footer";
// const Header = React.lazy(() => import("./pages/Components/Header"));
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import './App.css'

function App() {

  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App
