"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Asterisk, LoaderCircle } from "lucide-react";
import { LOGIN_ROUTE } from "@/Constants/routes";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Registration failed.",
        );
      }

      router.push("/login");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-[#d1d5db] bg-transparent px-3 py-2.5 text-white outline-none transition focus:border-red-500";

  const labelClass = "mb-2 block text-base text-[#e5e7eb]";

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#192127] px-4 py-8 text-white">
      <div className="w-full max-w-[600px] rounded-lg bg-[#0c131d] px-6 py-7 sm:px-12">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-[#e5e7eb]">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
              <Asterisk size={12} className="ml-0.5 inline text-primary" />
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
              <Asterisk size={12} className="ml-0.5 inline text-red-500" />
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Mobile
              <Asterisk size={12} className="ml-0.5 inline text-red-500" />
            </label>

            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClass}
            />
          </div>

          <p className="text-base text-[#e5e7eb]">
            Password will be sent via email
          </p>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ed1c2a] py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <LoaderCircle size={18} className="animate-spin" />
            )}
            {isSubmitting ? "Please wait..." : "Continue"}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-400/80" />

        <p className="mt-8 text-center text-base text-[#e5e7eb]">
          Already have an account?{" "}
          <Link
            href={LOGIN_ROUTE}
            className="text-red-500 transition hover:text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}