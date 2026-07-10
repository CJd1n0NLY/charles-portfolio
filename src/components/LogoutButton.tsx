"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-muted hover:text-primary bg-surface/50 hover:bg-surface border border-surface rounded transition-colors"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Terminate Session
    </button>
  );
}