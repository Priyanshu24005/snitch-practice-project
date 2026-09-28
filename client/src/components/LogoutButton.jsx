import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import {api} from "../api/api";
import { removeUser } from "../state/authslice";
import { clearCart } from "../state/cartslice";

const defaultClass =
  "flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 disabled:opacity-60";

const LogoutButton = ({ className = defaultClass, onDone }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      toast.success("Logged out");
    } catch {
      // server error aaye tab bhi local logout kar do
      toast.info("Logged out");
    } finally {
      dispatch(removeUser()); // token hatata hai + user null
      dispatch(clearCart());
      setLoading(false);
      onDone?.();
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      <LogOut size={16} />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;