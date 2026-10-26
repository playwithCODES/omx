"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Asterisk, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { loginUrl } from "@/lib/apiEndpoints";
import { FORGOT_PASSWORD, REGISTER_ROUTE } from "@/Constants/routes";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string" ? data : data.message || "Login failed.",
        );
      }

      if (!data.token) {
        throw new Error("Login response did not include a token.");
      }

      // Save the authenticated user's information.
      sessionStorage.setItem("omx_admin_token", data.token);

      sessionStorage.setItem(
        "omx_admin_user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          roles: data.roles,
        }),
      );
      window.dispatchEvent(new Event("omx-auth-change"));

      // Both customers and admins return to the customer homepage.
      router.replace("/");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#192127] px-4 py-8 text-white">
      <div className="w-full max-w-150 rounded-lg bg-[#0c131d] px-6 py-8 sm:px-12 sm:py-8">
        <h1 className="mb-7 text-4xl font-bold tracking-tight text-[#e5e7eb]">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-base text-[#e5e7eb]"
            >
              Email
              <Asterisk size={12} className="ml-0.5 inline text-red-500" />
            </label>

            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-[#d1d5db] bg-transparent px-3 py-2.5 text-white outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-base text-[#e5e7eb]"
            >
              Password
              <Asterisk size={12} className="ml-0.5 inline text-red-500" />
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-[#d1d5db] bg-transparent px-3 py-2.5 pr-12 text-white outline-none transition focus:border-red-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className="mt-9 flex justify-end">
              <Link
                href={FORGOT_PASSWORD}
                className="text-base text-red-500 transition hover:text-red-400"
              >
                Forgot Password?
              </Link>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ed1c2a] py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <LoaderCircle size={18} className="animate-spin" />
            )}
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-400/80" />

        <p className="mt-8 text-center text-base text-[#e5e7eb]">
          Don&apos;t have an account?{" "}
          <Link
            href={REGISTER_ROUTE}
            className="text-red-500 transition hover:text-red-400"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
