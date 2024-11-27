import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
};

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // initial sign in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000;
        return token;
      }
      // return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      // access token has expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // update session with new access token
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
