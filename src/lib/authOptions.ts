import { NextAuthOptions } from 'next-auth';
// import { FirestoreAdapter } from '@auth/firebase-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { auth as admin } from '@/lib/admin';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials?.email || '',
            credentials?.password || ''
          );
          if (userCredential) {
            return {
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  // adapter: FirestoreAdapter(firestore) as unknown as NextAuthOptions['adapter'],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const isAdmin = (await admin.getUser(user.id)).customClaims?.admin;
        token.id = user.id;
        token.role = isAdmin ? 'admin' : 'user';
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user.id = token.id!;
      session.user.role = token.role as 'admin' | 'user';
      return session;
    },
  },
};
