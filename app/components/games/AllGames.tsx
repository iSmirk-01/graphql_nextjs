"use client"; // Ensure this is the first line

import { useQuery, gql } from "@apollo/client";

const GET_GAMES = gql`
  query GamesQuery {
    games {
      id
      title
      platform
    }
  }
`;

function AllGames() {
  const { data, loading, error } = useQuery(GET_GAMES);

  if (loading) return <p className="flex items-center justify-center">Loading...</p>;
  if (error) return (
    <p className="text-red-500 flex items-center justify-center">
      Error: {error.message}
    </p>
  );

  return (
    <div className="flex flex-col justify-center items-center gap-10 border p-8">
      <h1 className="text-5xl font-bold">All Games</h1>

      {/* Table Header */}
      <div className="grid grid-cols-3 w-[900px] text-left font-bold border-b pb-2">
        <span className="w-[200px]">ID</span>
        <span className="w-[200px]">Title</span>
        <span className="w-[200px]">Platform</span>
      </div>

      {/* Table Rows */}
      {data?.games.map(
        (game: { title: string; id: string; platform: string[] }) => (
          <div
            key={game.id}
            className="grid grid-cols-3 w-[900px] border-b py-2"
          >
            <span className="w-[200px] text-gray-500">{game.id}</span>
            <span className="w-[200px]">{game.title}</span>
            <span className="w-[200px]">{game.platform.join(", ")}</span>
          </div>
        )
      )}
    </div>
  );
}

export default AllGames;
