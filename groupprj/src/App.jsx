import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.jsx/page.jsx';
import Menu from './AppMenu/menu.jsx';
import Home from './home.jsx';

import './App.css'

export default function App() {

 return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />

      </Routes>
    </BrowserRouter>
 )
}

