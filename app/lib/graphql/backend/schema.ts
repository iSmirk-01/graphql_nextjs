export const typeDefs = `#graphql

    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        author: Author!
        reviews: [Review!]
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        games: [Game!]
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        author: Author!
        game: Game!
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        deleteGame(id: ID!): [Game!]!
        addGame(game: AddGameInput!): Game!
        addReview(review: AddReviewInput!): Review!
        updateGame(id: ID! edits: EditGameInput!): Game
    }

    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input AddReviewInput {
        game_id: ID!
        rating: Int!
        content: String!
        author_id: ID!
    }

    input EditGameInput {
        title: String!
        platform: [String]!
    }
`;
