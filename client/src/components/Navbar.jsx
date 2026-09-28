import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
  LayoutDashboard,
  Package,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const links = [
    { to: "/main", label: "Home", icon: Home, end: true },
    { to: "/main/products", label: "Products", icon: ShoppingBag },
    { to: "/main/cart", label: "Cart", icon: ShoppingCart },
    { to: "/main/profile", label: "Profile", icon: User },
  ];

  if (user?.role === "seller") {
    links.push(
      { to: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/seller/products", label: "My Products", icon: Package, end: true }
    );
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm uppercase tracking-wide transition-colors ${
      isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/main" className="text-2xl font-black tracking-widest">
          SNITCH
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <LogoutButton />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <LogoutButton
            className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-500 hover:text-black"
            onDone={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;