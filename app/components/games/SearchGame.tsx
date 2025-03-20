"use client";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

function SearchGame() {
  const [value, setValue] = useState("1");

  const GET_GAME = gql`
    query GetGameByIdQuery($id: ID!) {
      game(id: $id) {
        id
        title
        platform
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id: value },
    skip: !value,
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="border my-8 min-h-44 flex flex-col justify-center items-center p-8 gap-2">
      <h1 className="text-5xl font-bold">Search By Id</h1>
      <select
        className="w-15 text-center bg-black text-red-500 my-4 p-1 px-3"
        value={value}
        onChange={handleChange}
        name="options"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && data.game && (
        <div className="flex flex-col gap-8 items-center justify-center" key={data.game.id}>
          <div className="grid grid-cols-3 w-[900px] border-b pb-2 text-left font-bold">
            <span className="w-[200px]">ID</span>
            <span className="w-[200px]">Title</span>
            <span className="w-[200px]">Platform</span>
          </div>
          <div className="grid grid-cols-3 w-[900px] py-2 border-b">
            <div className="w-[200px] text-gray-500">{data.game.id}</div>
            <div className="w-[200px]">{data.game.title}</div>
            <div className="w-[200px]">{data.game.platform.join(", ")}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchGame;
