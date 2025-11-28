import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/loginPage.jsx";
import Clothes from "./pages/clothes.jsx";
import Home from "./pages/home.jsx";
import { Chatbox } from "./pages/Chatbox.jsx";
import ProductDetail from "./pages/ProductDetail";
import SearchResult from "./pages/SearchResult.jsx";
import AddItem from "./pages/AddItem.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LikeIt from "./pages/LikeIt.jsx";
import LoginToast from "./component/LoginToast.jsx";
import NoNavLayout from "./component/layout/NoNavLayout.jsx";
import DefaultLayout from "./component/layout/DefaultLayout.jsx";
import FetchData from "./component/FetchData.jsx";

export default function App() {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <>
      {toast && <LoginToast message={toast} />}
      <BrowserRouter>
        <Routes>
          {/* Pages WITH Nav */}
          <Route element={<DefaultLayout />}>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/chat" element={<Chatbox />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/likeit" element={<LikeIt />} />
          </Route>

          {/* Pages WITHOUT Nav */}
          <Route element={<NoNavLayout />}>
            <Route path="/" element={<LoginPage showToast={showToast} />} />
            <Route
              path="/signup"
              element={<SignUpPage showToast={showToast} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
