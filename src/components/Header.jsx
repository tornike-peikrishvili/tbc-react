import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gray-900 shadow">
      <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
        <Link to="/landing" className="font-medium text-gray-100">
          Logo
        </Link>
        <nav className="flex items-center space-x-10">
          <Link to="/landing" className="nav-link">
            Home
          </Link>
          <Link to="/" className="nav-link">
            Services
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <button className="btn">Sign in</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
