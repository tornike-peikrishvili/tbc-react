import Link from "next/link";

function Header() {
  return (
    <header className="w-full  bg-gray-900">
      <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
        <Link href="/" className="font-medium text-gray-100">
          Logo
        </Link>
        <nav className="flex items-center space-x-10">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/" className="nav-link">
            About
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/profile" className="nav-link">
            Profile
          </Link>
          <button className="btn">Sign in</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
