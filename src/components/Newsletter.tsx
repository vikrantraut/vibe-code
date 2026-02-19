"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call – replace with your newsletter provider
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="rounded-2xl border border-sage-200 bg-sage-100/50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-2xl font-bold text-sage-800">
          Get fresh recipes in your inbox
        </h2>
        <p className="mt-2 text-sage-600">
          Join our newsletter for new salad ideas, tips, and exclusive content.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === "success"}
            className="input-field sm:min-w-[240px]"
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="btn-primary whitespace-nowrap disabled:opacity-70"
          >
            {status === "loading"
              ? "Subscribing..."
              : status === "success"
                ? "Subscribed!"
                : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-3 text-sm text-sage-600">Thanks! Check your inbox to confirm.</p>
        )}
      </div>
    </section>
  );
}
