import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/navbar/Navbar";

const index = () => {
  return (
    <div className="no-scrollbar overflow-scroll">
      <Navbar />
      <div className="flex items-center justify-center flex-col bg-purple-300 font-mono">
        <div className="flex flex-col items-center justify-center h-[91.35vh]">
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default index;
