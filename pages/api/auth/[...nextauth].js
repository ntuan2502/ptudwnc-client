import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { getApiUrl } from "../../../lib/Utils";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identifier: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(getApiUrl("/auth/login"), {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user.success) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ account, token, user }) => {
      // first time jwt callback is run, user object is available
      if (account) {
        let data;
        if (account.provider === "google") {
          const res = await axios.get(getApiUrl("/auth/google/token"), {
            headers: {
              access_token: account.access_token,
            },
          });
          data = res.data;
        } else if (account.provider === "facebook") {
          const res = await axios.get(getApiUrl("/auth/facebook/token"), {
            headers: {
              access_token: account.access_token,
            },
          });
          data = res.data;
        } else if (account.provider === "credentials") {
          token.jwt = user.jwt;
          token.user = user.user;
          return token;
        }
        token.jwt = data.jwt;
        token.user = data.user;
        return token;
      }

      if (user) {
        if (token.jwt) {
          return token;
        } else {
          token.jwt = user.jwt;
          token.user = user.user;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.jwt = token.jwt;
        session.user = token.user;
      }

      return session;
    },
  },
  secret: "f35300bcf8c734e9816068b79b702ae6",
  jwt: {
    secret: "f35300bcf8c734e9816068b79b702ae6",
    encryption: true,
  },
  pages: {
    signIn: "/auth/login",
  },
});
