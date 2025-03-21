import { ApolloClient, ApolloCache, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
    uri: `http://localhost:3000/api/graphql`
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client