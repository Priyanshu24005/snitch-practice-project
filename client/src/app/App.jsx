import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./app.routes";
import { getUser } from "../api/auth.api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default App;