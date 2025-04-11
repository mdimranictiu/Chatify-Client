import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          // Step 1: Authenticate user
          const response = await axios.post("http://localhost:5000/api/auth/user", {
            email,
            password,
          });

          const user = response?.data;

          if (user) {
            // Step 2: Generate JWT
            const jwtRes = await axios.post("http://localhost:5000/api/jwt", {
              email: user?.email,
            });

            const token = jwtRes?.data?.token;

            // Add token to user object (for session use)
            return { ...user, token };
          }

          return null;
        } catch (error) {
          console.error(error);
          throw new Error(
            error?.response?.data?.message || "An unexpected error occurred"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
