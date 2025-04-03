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
          const response = await axios.post("http://localhost:5000/api/auth/user", {
           email ,password
          });

          const user = response?.data;
          console.log(response.message)

          if (user) {
            return user; 
          }
        } catch (error) {
          if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error("An unexpected error occurred");
          }
        }

        return null; 
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
