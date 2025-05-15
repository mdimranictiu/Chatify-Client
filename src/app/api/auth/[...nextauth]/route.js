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
          // Authenticate user
          const response = await axios.post("https://chatify-server-1-1a8e.onrender.com/api/auth/user", {
            email,
            password,
          });

          const user = response?.data;

          if (user) {
            const jwtRes = await axios.post("https://chatify-server-1-1a8e.onrender.com/api/jwt", {
              email: user?.email,
            });

            const token = jwtRes?.data?.token;
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

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, 
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
