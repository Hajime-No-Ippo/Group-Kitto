import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import Menu from "./pages/menu.jsx";
import Clothes from "./pages/clothes.jsx";
import Home from "./pages/home.jsx";
import { Chatbox } from "./pages/Chatbox.jsx";

import Nav from "./component/nav.jsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/exchangeProduct" element={<Menu />} />
        <Route path="/clothes" element={<Clothes />} />
      </Routes>
    </BrowserRouter>
  );
}
