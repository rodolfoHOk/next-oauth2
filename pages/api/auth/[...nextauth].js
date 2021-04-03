import NextAuth from 'next-auth';
import jwtDecode from 'jwt-decode';

export default NextAuth({
  providers: [
    {
      id: 'keycloak',
      name: 'Keycloak',
      type: 'oauth',
      version: '2.0',
      params: { grant_type: 'authorization_code' },
      scope: "profile email",
      profile: (profile) => ({
        ...profile,
        id: profile.sub,
      }),
      accessTokenUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/token`,
      requestTokenUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/auth`,
      authorizationUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/auth?response_type=code`,
      profileUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/userinfo`,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
    }
  ],

  session: {
    jwt: true,
    maxAge: 30 * 60
  },

  jwt: {},

  pages: {},

  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },

    async session(session, token) {
      const accessToken = jwtDecode(token.accessToken);
      session.user.username = accessToken.preferred_username;
      session.user.roles = accessToken.resource_access[process.env.NEXT_PUBLIC_CLIENT_ID].roles;
      session.user.isAdmin = session.user.roles.includes('admin');
      // session.accessToken = token.accessToken;
      return session;
    }
  },

  events: {},

  debug: false,

});
