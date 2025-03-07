import { games as gamesList, authors, reviews } from "@/app/lib/graphql/backend/_db"
import { platform } from "os";

let games = [...gamesList]

export const resolvers = {
  Query: {
    games() {
      return games;
    },
    game(_: undefined, args: { id: string }) {
      return games.find((game) => game.id === args.id);
    },
    reviews() {
      return reviews;
    },
    review(_: undefined, args: { id: string }) {
      return reviews.find((review) => review.id === args.id);
    },
    authors() {
      return authors;
    },
    author(_: undefined, args: { id: string }) {
      return authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent: { id: string }) {
      return reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent: { id: string }) {
      return reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent: { author_id: string }) {
      return authors.find((auther) => auther.id === parent.author_id);
    },
    game(parent: { game_id: string }) {
      return games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_: undefined, args: { id: string }) {
      const index = games.findIndex((game) => game.id === args.id);
      if (index === -1) {
        throw new Error("Game not found");
      }
      games.splice(index, 1); // Remove the game from the array
      return games; // Return the updated list
    },

    addGame(
      _: undefined,
      args: { game: { title: string; platform: string[] } }
    ) {
      let newGame = {
        id: Math.floor(Math.random() * 1000).toString(),
        title: args.game.title,
        platform: args.game.platform,
      };
      games.push(newGame);
      return newGame;
    },

    addReview(
      _: undefined,
      args: {
        review: {
          game_id: string;
          author_id: string;
          content: string;
          rating: number;
        };
      }
    ) {
      const gameFound = games.find(
        (game) => game.id === args.review.game_id.toString()
      );
      const userFound = authors.find(
        (author) => author.id === args.review.author_id.toString()
      );

      if (!gameFound) {
        console.log("Game not found! ID provided:", args.review.game_id);
        throw new Error("Game not found");
      }
      if (!userFound) {
        throw new Error("User not found");
      }

      const review = {
        id: Math.floor(Math.random() * 1000).toString(),
        game_id: args.review.game_id,
        author_id: args.review.author_id,
        content: args.review.content,
        rating: Number(args.review.rating),
      };

      reviews.push(review);
      return review;
    },

    updateGame(_: undefined, args: { id: string, edits: { title: string, platform: string[] } }) {
      const game = games.find((game) => game.id === args.id);
      if (!game) {
        throw new Error("Game not found");
      }

      game.title = args.edits.title;
      game.platform = args.edits.platform;

      return game;
    }
  },
};
