import Nav from "../nav.jsx";
import { Outlet } from "react-router-dom";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
    <Outlet />
    </>
  );
}
