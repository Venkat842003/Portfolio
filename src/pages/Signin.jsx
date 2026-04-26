import { useState } from "react";
import Button from "../ui/Button";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import { supabase } from "../lib/supabase";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";
import { useAuth } from "../context/auth/useAuth";
import { useData } from "../context/data/useData";

function Signin() {
  const { session } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showsPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("signin");
  const [username, setUsername] = useState("");

  async function handleLogin(e) {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard", { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      setError("");
      setIsLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setError("Account created, you can now sign in.");
        setMode("signin");
        setPassword("");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  if (session) return <Navigate to="/dashboard" replace />;

  return (
    <div className="py-10">
      <form
        onSubmit={mode === "signin" ? handleLogin : handleSignup}
        className="flex flex-col gap-6 bg-neutral-300 text-neutral-900 w-1/3 m-auto p-7 rounded-xl"
      >
        {mode === "signup" && (
          <input
            type="username"
            placeholder="Username"
            className="border p-2 rounded-xl "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-xl "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showsPassword ? "text" : "password"}
            placeholder="password"
            className=" w-full border p-2 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 "
            onClick={() => {
              setShowPassword(!showsPassword);
            }}
          >
            {showsPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
          </button>
        </div>
        {error && <p className="text-sm text-red-700 pl-2">{error}</p>}
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant="primary"
            disabled={!email.trim() || !password.trim()}
          >
            {isLoading ? (
              <Loading />
            ) : mode === "signin" ? (
              "Sign in "
            ) : (
              "Sign up"
            )}
          </Button>
          <p className=" text-sm text-blue-700 text-center">
            {mode === "signin" ? "New user, " : "Already have an account, "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className=" underline underline-offset-1 cursor-pointer"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
