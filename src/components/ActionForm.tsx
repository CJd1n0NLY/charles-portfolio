"use client";

import toast from "react-hot-toast";
import { ReactNode } from "react";

interface ActionFormProps {
  action: (formData: FormData) => Promise<any>;
  successMessage: string;
  className?: string;
  children: ReactNode;
}

export default function ActionForm({ action, successMessage, className, children }: ActionFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const promise = action(formData);

    toast.promise(promise, {
      loading: 'Executing...',
      success: successMessage,
      error: 'Operation failed.',
    });

    try {
      await promise;
    } catch (e) {
      // toast.promise already surfaced this to the user.
      console.error(e);
    }
  };

  return (
    <form action={handleSubmit} className={className}>
      {children}
    </form>
  );
}