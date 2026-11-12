import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Session } from "@supabase/supabase-js";
import "../index.css";
import { supabase } from "../lib/supabase";
import { Admin } from "./Admin";
import { Login } from "./Login";

function AdminApp() {
  // undefined = still checking for an existing session
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <Shell>
        <p className="text-sm">
          Supabase isn't configured. Set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> (see <code>.env.example</code>).
        </p>
      </Shell>
    );
  }
  if (session === undefined) return <Shell>loading…</Shell>;
  return <Shell>{session ? <Admin email={session.user.email ?? ""} /> : <Login />}</Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh px-3 py-5 sm:px-6">
      <main className="paper-grain mx-auto w-full max-w-2xl rounded-[var(--radius-page)] bg-paper p-4 shadow-[0_24px_70px_-28px_rgba(31,26,20,0.45)] sm:p-8">
        {children}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>
);
