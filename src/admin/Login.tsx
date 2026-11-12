import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Button, Field } from "./ui";

// Passwordless: Supabase emails a magic link that lands back on this page.
// Sign-ups are disabled in the dashboard, so only existing users get a link.
export function Login() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError(null);
    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href, shouldCreateUser: false },
    });
    if (error) {
      setError(error.message);
      setState("idle");
    } else {
      setState("sent");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <h1 className="m-0 font-serif text-3xl font-medium">shelf admin</h1>
      {state === "sent" ? (
        <p className="text-sm">Check your inbox for a sign-in link.</p>
      ) : (
        <>
          <Field label="email">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Button type="submit" disabled={state === "sending"}>
            {state === "sending" ? "sending…" : "email me a link"}
          </Button>
          {error && <p className="text-sm text-red-700 dark:text-red-300">{error}</p>}
        </>
      )}
    </form>
  );
}
