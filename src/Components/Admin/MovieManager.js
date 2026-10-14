
"use client";

import { useState } from "react";
import MoviesForm from "@/Components/Admin/MovieForm";

export default function MovieManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-primary px-4 py-2 text-white"
      >
        + Add Movie
      </button>

      {isModalOpen && (
        <MoviesForm
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}