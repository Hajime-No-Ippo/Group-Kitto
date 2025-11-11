import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.jsx/page.jsx';
import Menu from './AppMenu/menu.jsx';
import Clothes from './AppMenu/clothes.jsx';
import Home from './home.jsx';
import { Chatbox } from "./chatBox/Chatbox.jsx";


import './App.css'

export default function App() {

 return(
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
 )
}

