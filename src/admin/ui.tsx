// Small shared building blocks for the admin page. Sized for thumbs: every
// control is at least 44px tall.

const INPUT =
  "[&_input]:h-11 [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-ink/25 " +
  "[&_input]:bg-card [&_input]:px-3 [&_input]:text-base [&_input]:text-ink " +
  "[&_input:focus]:outline-none [&_input:focus]:ring-2 [&_input:focus]:ring-ink";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 text-[13px] font-medium text-ink-soft ${INPUT}`}>
      {label}
      {children}
    </label>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const look = {
    primary: "bg-ink text-paper",
    ghost: "border border-ink/25 bg-card text-ink",
    danger: "border border-red-700/40 bg-card text-red-700 dark:text-red-300",
  }[variant];
  return (
    <button
      type="button"
      {...props}
      className={`flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-semibold disabled:opacity-50 ${look} ${className}`}
    />
  );
}

/** Square icon-only button (reorder, edit, …). */
export function IconButton({ icon, label, ...props }: ButtonProps & { icon: string; label: string }) {
  return (
    <Button variant="ghost" aria-label={label} title={label} className="px-0" {...props}>
      <i className={`ti ${icon} text-lg`} aria-hidden="true" />
    </Button>
  );
}
