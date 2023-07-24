import React from "react";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen no-scrollbar overflow-scroll">
      <Navbar />
      <div className="h-[100%] bg-purple-300 no-scrollbar">
        <div className="flex flex-col items-start justify-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
