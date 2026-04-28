import { useState } from "react";
import Logo from "./Logo";
import NavrBar from "./NavrBar";
import ProfileCard from "./ProfileCard";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-neutral-900 z-50">
      <div className=" relative mx-auto flex  items-center justify-between px-10 py-6  font-sans  border-b border-neutral-600 ">
        <Logo />
        <div className="flex-1 flex justify-center hidden sm:flex">
          <NavrBar />
        </div>
        <div className="hidden sm:block">
          <ProfileCard />
        </div>
        <div >
          <button
            className="sm:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            ☰
          </button>
          {open && (
            <div className=" absolute flex flex-col items-center gap-4 py-4 bg-neutral-800 right-2 p-2  rounded-xl">
              <NavrBar isMobile={true} setOpen={setOpen}/>
              <ProfileCard />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
