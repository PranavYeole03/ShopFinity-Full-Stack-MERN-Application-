import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
   <section className="bg-white">
  <div className="container mx-auto p-3 grid grid-cols-12 gap-4">
    {/* Left Menu */}
    <aside className="col-span-12 lg:col-span-3 py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r">
      <UserMenu />
    </aside>

    {/* Right Content*/}
    <main className="col-span-12 lg:col-span-9 bg-white min-h-[75vh]">
      <Outlet />
    </main>
  </div>
</section>

  );
};

export default Dashboard;
