const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <h2 className="text-xl font-black tracking-widest">SNITCH</h2>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Snitch. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;