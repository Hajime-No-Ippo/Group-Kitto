import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import Clothes from "./pages/clothes.jsx";
import Home from "./pages/home.jsx";
import { Chatbox } from "./pages/Chatbox.jsx";
import ProductDetail from "./pages/ProductDetail";
import SearchResult from "./pages/SearchResult.jsx";
import AddItem from "./pages/AddItem.jsx"
import UserProfile from "./pages/UserProfile.jsx";

import Nav from "./component/nav.jsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/addItem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}
