declare module '@auth/firebase-adapter';
declare module 'next-auth/client';
declare module 'next-auth/providers';
declare module 'next-auth';

declare module 'next-auth/adapters';

import NextAuth from 'next-auth';

import NextAuth from 'next-auth';

export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'user';
      name: string | null;
      email: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}
