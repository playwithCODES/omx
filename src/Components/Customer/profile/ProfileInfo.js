"use client";

import { useEffect, useState } from "react";
import { CircleUser, LogOut } from "lucide-react";
import { getMeUrl, updateMyProfileUrl } from "@/lib/apiEndpoints";
import { useRouter } from "next/navigation";

function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("omx_admin_token");

        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(getMeUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();

        setUser(data);
        setName(data.name || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  function handleEdit() {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setIsEditing(true);
  }

  async function handleSave(event) {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem("omx_admin_token");

      if (!token) {
        throw new Error("Please log in first.");
      }

      const response = await fetch(updateMyProfileUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setUser((previousUser) => ({
        ...previousUser,
        ...data,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.message || "Unable to update profile.");
    }
  }

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl bg-black px-4 py-6 md:w-72">
      <div className="flex flex-col items-center justify-center">
        <CircleUser className="mb-2 h-10 w-10 text-primary-500" />

        <h1 className="text-center text-white">
          {isLoading ? "Loading..." : user?.name || "User"}
        </h1>

        <span className="break-all text-center text-sm text-gray-500">
          {user?.email || ""}
        </span>

        <span className="text-sm text-gray-500">{user?.phone || ""}</span>
      </div>

      <hr className="my-4 w-full border-t border-gray-500" />

      <div className="flex w-full flex-col text-gray-500">
        <div className="flex justify-between gap-2">
          <span>Total bookings</span>
          <span className="text-white">3</span>
        </div>

        <div className="mt-2 flex justify-between gap-2 text-sm">
          <span>Total spent</span>
          <span className="text-white">Rs 3252</span>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            disabled={!user}
            className="mx-auto my-5 rounded-xl border border-gray-400 px-8 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Edit Profile
          </button>
        )}

        {isEditing && (
          <form className="mt-3 w-full space-y-3" onSubmit={handleSave}>
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1 block text-sm text-gray-400"
              >
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="mb-1 block text-sm text-gray-400"
              >
                Phone Number
              </label>

              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-md bg-primary px-3 py-2 text-sm text-white"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-md border border-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("omx_admin_token");
            sessionStorage.removeItem("omx_admin_user");

            window.dispatchEvent(new Event("omx-auth-change"));
            router.replace("/");
          }}
          className="mx-auto flex items-center justify-center gap-2 rounded-xl border border-red-500 px-8 py-2 text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
