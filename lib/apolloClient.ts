// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://ap-south-1.cdn.hygraph.com/content/cm9sam4di03pf08vyfqd73smc/master', 
  }),
  cache: new InMemoryCache(),
});

export default client;
