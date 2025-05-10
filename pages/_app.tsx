import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient'; 
import NavBar from '../components/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider>
      <ApolloProvider client={client}>
        {!pathname.startsWith("/sign-in") && !pathname.startsWith("/sign-up") && (
          <NavBar />
        )}
        <Component {...pageProps} />
      </ApolloProvider>
    </ClerkProvider>
  );
}

export default MyApp;
