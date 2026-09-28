import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Loader />;
  if (isAuthenticated) return <Navigate to="/main" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-black tracking-widest">
          SNITCH
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;