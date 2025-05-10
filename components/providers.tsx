"use client";

import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import NavBar from "../components/NavBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SignedIn>
        <ApolloProvider client={client}>
          <NavBar />
          {children}
        </ApolloProvider>
      </SignedIn>

      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
    </ClerkProvider>
  );
}
