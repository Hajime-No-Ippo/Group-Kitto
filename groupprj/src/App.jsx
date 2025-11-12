import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage.jsx';
import Menu from './pages/menu.jsx';
import Clothes from './pages/clothes.jsx';
import Home from './pages/home.jsx';
import { Chatbox } from "./pages/Chatbox.jsx";
import Nav from './component/nav.jsx';
import Products from "./Data/ProductData.js";


import './App.css'

export default function App() {

 return(
  
  <>
      <Nav />

  
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/chat" element={<Chatbox />} />   
        <Route path="/exchangeProduct" element={<Menu />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/edu" element={<Menu />} />
        <Route path="/books" element={<Menu />} />
      </Routes>
    </BrowserRouter>
    </>
 )
}

