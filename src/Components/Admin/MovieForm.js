
"use client";

import { useEffect, useState } from "react";
import { X, Upload, ImagePlus, LoaderCircle } from "lucide-react";
import { fetchMoviesUrl } from "@/lib/apiEndpoints";

// ImageUpload is outside MoviesForm to keep its component identity stable.
function ImageUpload({
  type,
  file,
  preview,
  title,
  handleImage,
  handleDrop,
  removeImage,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{title}</label>

      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, type)}
        className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 p-4 text-center transition hover:border-red-500"
      >
        {preview ? (
          <img
            src={preview}
            alt={`${title} preview`}
            className="max-h-44 w-full rounded-md object-contain"
          />
        ) : (
          <>
            <ImagePlus size={32} className="mb-2 text-gray-400" />
            <span className="font-medium">
              Drag and drop {type} here
            </span>
            <span className="mt-1 text-sm text-gray-400">
              or click to browse
            </span>
            <Upload size={18} className="mt-3" />
          </>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            handleImage(event.target.files[0], type);
            event.target.value = "";
          }}
        />
      </label>

      {file && (
        <div className="mt-2 flex items-center justify-between gap-2 text-sm">
          <span className="truncate text-gray-300">{file.name}</span>

          <button
            type="button"
            onClick={() => removeImage(type)}
            className="shrink-0 text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function MoviesForm({ onCancel, onMovieCreated }) {
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);

  const [posterPreview, setPosterPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (posterPreview) URL.revokeObjectURL(posterPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [posterPreview, bannerPreview]);

  function handleImage(file, type) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    setError("");

    const previewUrl = URL.createObjectURL(file);

    if (type === "poster") {
      setPoster(file);
      setPosterPreview(previewUrl);
    } else {
      setBanner(file);
      setBannerPreview(previewUrl);
    }
  }

  function handleDrop(event, type) {
    event.preventDefault();
    handleImage(event.dataTransfer.files[0], type);
  }

  function removeImage(type) {
    if (type === "poster") {
      setPoster(null);
      setPosterPreview("");
    } else {
      setBanner(null);
      setBannerPreview("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!poster || !banner) {
      setError("Please select both the movie poster and banner.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    formData.delete("poster");
    formData.delete("banner");

    formData.append("poster", poster);
    formData.append("banner", banner);

    setIsSubmitting(true);

    try {
      const response = await fetch(fetchMoviesUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create movie.");
      }

      const createdMovie = await response.json();

      if (onMovieCreated) {
        await onMovieCreated(createdMovie);
      }

      onCancel();
    } catch (err) {
      console.error("Create movie error:", err);
      setError(
        err.message ||
          "Could not create movie. Check your backend connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={() => !isSubmitting && onCancel()}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-[#18181b] p-5 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold">Add New Movie</h2>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            aria-label="Close"
            className="text-gray-300 hover:text-white disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Movie Name
            </label>
            <input
              name="name"
              required
              placeholder="Enter movie name"
              className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Genre
              </label>
              <input
                name="genre"
                required
                placeholder="e.g. Action"
                className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Runtime
              </label>
              <input
                name="runtime"
                required
                placeholder="e.g. 2h 35m"
                className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Enter movie description"
              className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImageUpload
              type="poster"
              file={poster}
              preview={posterPreview}
              title="Movie Poster"
              handleImage={handleImage}
              handleDrop={handleDrop}
              removeImage={removeImage}
            />

            <ImageUpload
              type="banner"
              file={banner}
              preview={bannerPreview}
              title="Movie Banner"
              handleImage={handleImage}
              handleDrop={handleDrop}
              removeImage={removeImage}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Trailer URL
            </label>
            <input
              name="link"
              type="url"
              placeholder="https://example.com/trailer"
              className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Release Date
            </label>
            <input
              name="releaseDate"
              type="date"
              required
              className="w-full rounded-md border border-gray-700 bg-zinc-800 p-3 outline-none focus:border-red-500"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-700 bg-[#18181b] pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="rounded-md border border-gray-600 px-4 py-2 hover:bg-zinc-700 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-medium hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <LoaderCircle size={18} className="animate-spin" />
              )}
              {isSubmitting ? "Saving..." : "Save Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
