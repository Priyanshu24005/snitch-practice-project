import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loader from "../components/Loader"

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export const SellerRoute = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "seller") return <Navigate to="/main" replace />;

  return <Outlet />;
};

export default ProtectedRoute;