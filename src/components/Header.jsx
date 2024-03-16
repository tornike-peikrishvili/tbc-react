function Header() {
  return (
    <header className="w-full bg-gray-900 shadow">
      <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
        <a href="/" className="font-medium text-gray-100">
          Logo
        </a>
        <nav className="flex items-center space-x-10">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            Service
          </a>
          <a href="/" className="nav-link">
            Products
          </a>
          <a href="/" className="nav-link">
            About
          </a>
          <a href="/" className="nav-link">
            Contact
          </a>
          <button className="btn">Sign in</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
