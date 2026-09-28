import { useSelector } from "react-redux";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-4xl font-black uppercase text-white">
          {user.name?.charAt(0)}
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase tracking-wide">
          {user.name}
        </h1>
        <p className="mt-1 text-gray-500">{user.email}</p>
        {user.role && (
          <span className="mt-4 rounded-full border border-gray-300 px-4 py-1 text-xs uppercase tracking-widest">
            {user.role}
          </span>
        )}
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <Link
          to="/main/cart"
          className="rounded-full border border-black py-3 text-center text-sm transition hover:bg-black hover:text-white"
        >
          My Cart
        </Link>
        {user.role === "seller" ? (
          <Link
            to="/seller/dashboard"
            className="rounded-full bg-black py-3 text-center text-sm text-white transition hover:bg-gray-800"
          >
            Seller Dashboard
          </Link>
        ) : (
          <Link
            to="/main/products"
            className="rounded-full bg-black py-3 text-center text-sm text-white transition hover:bg-gray-800"
          >
            Browse Products
          </Link>
        )}
      </div>
    </section>
  );
};

export default Profile;