import { Outlet } from "react-router-dom";

export default function NoNavLayout({ children }) {
  return <>{children}
    <Outlet />
    </>;
}
