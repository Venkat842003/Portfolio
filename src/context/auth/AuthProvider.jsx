import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
      setAuthLoading(false);
    }
    fetchSession();

    const { data: listner } = supabase.auth.onAuthStateChange(
      function (_event, session) {
        setSession(session);
      },
    );

    return () => {
      listner.subscription.unsubscribe();
    };
  }, []);

  const value = { session, user: session?.user?.email ?? null, authLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
