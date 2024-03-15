import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";


const ProfileDashboard = () => {
  return (
    <div className="flex gap-5 py-20 lg:px-40 min-h-screen bg-gray-100">
      <SideBar/>
      <Outlet />
    </div>
  );
};

export default ProfileDashboard;