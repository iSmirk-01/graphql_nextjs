import { games, authors, reviews } from "@/app/lib/graphql/_db"

export const resolvers = {
    Query: {
        games() {
            return games
        },
        game(_: undefined, args: { id: string; }){
            return games.find((game) => game.id === args.id)
        },
        reviews() {
            return reviews
        },
        review(_: undefined, args: { id: string; }) {
            return reviews.find((review) => review.id === args.id)
        },
        authors() {
            return authors
        },
        author(_: undefined, args: { id: string; }) {
            return authors.find((author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent: { id: string }) {
            return reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent: { id: string }) {
            return reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        author(parent: { author_id: string }) {
            return authors.find((auther) => auther.id === parent.author_id);
        },
        game(parent: { game_id: string }) {
            return games.find((game) => game.id === parent.game_id)
        }
    },
};
