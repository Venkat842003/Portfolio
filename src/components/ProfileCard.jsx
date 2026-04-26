import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth/useAuth"
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { supabase } from "../lib/supabase";
import Loading from "../ui/Loading";

function ProfileCard() {
  const { user, session } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const avatar = `https://ui-avatars.com/api/?name=${user || "User"}&background=random`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  async function handleSignout() {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    }
    setIsLoading(false);
    setIsOpen(false);
    navigate("/", { replace: true });
  }

  if (!session) {
    return (
      <NavLink
        to="/signin"
        className=" font-medium text-neutral-50  rounded-xl px-4 py-1  text-lg bg-sky-600 hover:bg-sky-700"
      >
        Sign in
      </NavLink>
    );
  }

  return (
    <div ref={cardRef} className="relative inline-block">
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full w-12 h-12 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className="absolute right-0 top-full mt-2  bg-neutral-700 py-3 px-5 rounded-xl flex flex-col gap-3 text-sm shadow-md shadow-neutral-900 z-50">
          <p>{user}</p>
          <Button variant="sky" onClick={handleSignout} disabled={isLoading}>
            {isLoading ? "Sigining out..." : "Sign out"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
