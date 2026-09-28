import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const SellerLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;