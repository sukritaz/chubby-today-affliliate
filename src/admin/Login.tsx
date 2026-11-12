import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Button, Field } from "./ui";

// Passwordless: Supabase emails a sign-in link AND a 6-digit code (the code
// needs {{ .Token }} in the Magic Link email template). Typing the code keeps
// you signed in to the browser you're in — handy on a phone, where tapping the
// link may open the mail app's built-in browser instead.
// Sign-ups are disabled, so only existing users get an email.
export function Login() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "verifying">("idle");
  const [error, setError] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError(null);
    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href.split("#")[0], shouldCreateUser: false },
    });
    if (error) {
      setError(error.message);
      setState("idle");
    } else {
      setState("sent");
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("verifying");
    setError(null);
    // success fires onAuthStateChange in main.tsx, which swaps in the admin
    const { error } = await supabase!.auth.verifyOtp({ email, token: code.trim(), type: "email" });
    if (error) {
      setError(error.message);
      setState("sent");
    }
  };

  if (state === "sent" || state === "verifying") {
    return (
      <form onSubmit={verify} className="flex flex-col gap-4">
        <h1 className="m-0 font-serif text-3xl font-medium">shelf admin</h1>
        <p className="m-0 text-sm">
          Sent to {email}. Tap the link in the email, or type the code here.
        </p>
        <Field label="code">
          <input
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6,10}"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Field>
        <Button type="submit" disabled={state === "verifying"}>
          {state === "verifying" ? "checking…" : "sign in"}
        </Button>
        <button
          type="button"
          className="self-start text-xs text-ink-faint underline"
          onClick={() => {
            setState("idle");
            setCode("");
            setError(null);
          }}
        >
          use a different email / send again
        </button>
        {error && <p className="m-0 text-sm text-red-700 dark:text-red-300">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={send} className="flex flex-col gap-4">
      <h1 className="m-0 font-serif text-3xl font-medium">shelf admin</h1>
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
      {error && <p className="m-0 text-sm text-red-700 dark:text-red-300">{error}</p>}
    </form>
  );
}
