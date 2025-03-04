import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { typeDefs } from "@/app/lib/graphql/types";
import { resolvers } from "@/app/lib/graphql/resolvers"

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

export const GET = startServerAndCreateNextHandler<NextRequest>(server);
export const POST = startServerAndCreateNextHandler<NextRequest>(server);