import { FC } from "react";
import { Outlet } from "react-router-dom";
import LayoutHeader from "../Header";
import LayoutFooter from "../Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout: FC = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <LayoutHeader />
      <ToastContainer theme="colored" />
      <main style={{ minHeight: "calc( 100% - 132px)" }} data-theme="light">
        <div className="container px-2 sm:mx-auto sm:px-0">
          <Outlet />
        </div>
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
