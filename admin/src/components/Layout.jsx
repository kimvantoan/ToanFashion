import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({children}) => {
  return <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 p-3">
      {children}
    </div>
  </div>;
};

export default Layout;
