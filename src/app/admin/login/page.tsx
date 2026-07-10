"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-canvas">
      <div className="w-full max-w-sm p-8 rounded-lg bg-surface border border-surface/80 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-display font-bold tracking-tight text-primary">System Access</h1>
          <p className="text-sm text-muted font-mono">Restricted area.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider uppercase text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-canvas border border-surface text-primary focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider uppercase text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-canvas border border-surface text-primary focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          {error && <p className="text-accent text-sm font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-canvas font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Initialize Session"}
          </button>
        </form>
      </div>
    </div>
  );
}