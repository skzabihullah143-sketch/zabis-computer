import * as React from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

const AUTH_DOMAIN = "zabiscomputer.local";

function usernameToEmail(username: string) {
  return `${username.trim()}@${AUTH_DOMAIN}`;
}

interface AuthContextValue {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const checkAdmin = React.useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase.from("admin_users").select("id").eq("id", userId).maybeSingle();
    setIsAdmin(!!data);
  }, []);

  React.useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await checkAdmin(data.session?.user.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      await checkAdmin(newSession?.user.id);
    });

    return () => listener.subscription.unsubscribe();
  }, [checkAdmin]);

  const signIn = React.useCallback(async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });
    if (error) {
      return { error: "Invalid username or password." };
    }
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", data.user?.id)
      .maybeSingle();
    if (!adminRow) {
      await supabase.auth.signOut();
      return { error: "This account is not authorized as an admin." };
    }
    setIsAdmin(true);
    return { error: null };
  }, []);

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
