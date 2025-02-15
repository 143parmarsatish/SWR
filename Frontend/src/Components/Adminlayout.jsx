import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ user, onLogout }) => {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto mt-4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
