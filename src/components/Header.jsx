import Logo from "./Logo";
import NavrBar from "./NavrBar";
import ProfileCard from "./ProfileCard";

function Header() {
  return (
    <header className="sticky top-0 bg-neutral-900 z-50">
      <div className="  mx-auto flex  items-center px-10 py-6  font-sans  border-b border-neutral-600 ">
        <Logo />
        <div className="flex-1 flex justify-center">
          <NavrBar />
        </div>
        <div className=" w-32 flex justify-end">
          <ProfileCard />
        </div>
      </div>
    </header>
  );
}

export default Header;
