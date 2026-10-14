
import MovieManager from "@/Components/Admin/MovieManager";
import { fetchMoviesUrl } from "@/lib/apiEndpoints";

export default async function MoviesPage() {
  const response = await fetch(fetchMoviesUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const movies = await response.json();

  return (
    <div className="p-6 text-white">
       <div className="flex text-black dark:text-white justify-between mb-5">
        <div>
          <h1 className="font-bold">OMX Cinemas</h1>
          <span>Movies Management Page</span>
        </div>
        <MovieManager/>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Movie</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Runtime</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Release Date</th>
            </tr>
          </thead>

          <tbody className="text-black dark:text-white">
            {movies.map((movie) => {
              return (
                <tr
                  key={movie._id}
                  className="border-b border-zinc-800 hover:bg-zinc-900"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {movie.name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    {movie.genre}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    {movie.runtime}
                  </td>

                  <td className="min-w-64 px-4 py-4 text-zinc-400">
                    {movie.description}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    {new Date(movie.releaseDate).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
