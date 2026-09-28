import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import SellerLayout from "../Layouts/SellerLayout";
import { ProtectedRoute, SellerRoute } from "./ProtectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import SellerDashboard from "../pages/SellerDashboard";
import SellerProducts from "../pages/SellerProducts";
import AddProduct from "../pages/AddProduct";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/main" replace /> },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/main",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "products", element: <Products /> },
          { path: "products/:id", element: <ProductDetails /> },
          { path: "cart", element: <Cart /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },

  {
    element: <SellerRoute />,
    children: [
      {
        path: "/seller",
        element: <SellerLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "products", element: <SellerProducts /> },
          { path: "products/create", element: <AddProduct /> },
        ],
      },
    ],
  },
]);