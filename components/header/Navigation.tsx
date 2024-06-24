import Dropdown from "./Dropdown";

import NavLinks from "./NavLinks";

async function Navigation() {
  return (
    <div className="m-auto flex h-14 w-4/5 items-center justify-between px-4 text-lg">
      <NavLinks />
      <div className="flex gap-8 pl-8">
        <Dropdown />
      </div>
    </div>
  );
}

export default Navigation;
