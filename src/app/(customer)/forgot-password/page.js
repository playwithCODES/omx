"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Asterisk, LoaderCircle, Mail, CheckCircle } from "lucide-react";
import { forgotPasswordUrl } from "@/lib/apiEndpoints";
import { LOGIN_ROUTE } from "@/Constants/routes";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(forgotPasswordUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Unable to process your request.",
        );
      }

      setMessage(
        data.message ||
          "If an account exists for this email, password reset instructions will be sent.",
      );
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#192127] px-4 py-8 text-white">
      <div className="w-full max-w-[480px] rounded-lg bg-[#0c131d] px-6 py-6 sm:px-8">
        <h1 className="mb-5 text-3xl font-bold tracking-tight text-[#e5e7eb]">
          Forgot Password
        </h1>

        <p className="mb-6 text-sm leading-6 text-gray-300">
          Enter your registered email address to receive password reset
          instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-base text-[#e5e7eb]"
            >
              Email
              <Asterisk
                size={12}
                className="ml-0.5 inline text-red-500"
              />
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your registered email"
                className="w-full rounded-md border border-[#d1d5db] bg-transparent py-2.5 pl-10 pr-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {message && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300"
            >
              <CheckCircle size={18} className="mt-0.5 shrink-0" />
              <p>{message}</p>
            </div>
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

        <p className="mt-5 text-center text-base text-[#e5e7eb]">
          Remember your password?{" "}
          <Link
            href={LOGIN_ROUTE}
            className="text-red-500 transition hover:text-red-400"
          >
            Return to login
          </Link>
        </p>
      </div>
    </main>
  );
}