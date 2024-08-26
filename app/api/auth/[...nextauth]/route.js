import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Add the Firebase UID to the session
      session.user.uid = user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id; // Store Firebase UID in the token
      }
      return token;
    },
  },

  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  }),
  pages: {
    error: "/auth/error", // Custom error page
  },
  debug: true, // Enable debug mode to get detailed logs
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
