import Dropdown from "./Dropdown";

import CartCount from "./CartCount";
import NavLinks from "./NavLinks";

async function Navigation() {
  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <NavLinks />
      <div className="flex gap-8 pl-8">
        <CartCount />
        <Dropdown />
      </div>
    </div>
  );
}

export default Navigation;
