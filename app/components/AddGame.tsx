"use client";

import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
      platform
    }
  }
`;
  
function AddGame() {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  const [addGame, { data, loading, error }] = useMutation(ADD_GAME);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, platform)
    await addGame({
      variables: { game: {
        title,
        platform: platform.split(",").map((p) => p.trim())
      } }
    });
    setTitle("");
    setPlatform("");
  };

  return (
    <div className="border py-8">
      <h2 className="font-bold mb-4 text-center text-5xl">Add a New Game</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          
        />
        <input
          type="text"
          placeholder="Platforms (comma-separated)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
 
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Game"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      {data && (
        <p className="mt-2 text-green-400">
          Game Added: {data.addGame.title} ({data.addGame.platform.join(", ")})
        </p>
      )}
    </div>
  );
}

export default AddGame;
