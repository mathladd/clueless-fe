import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _) {
        const { username, password } = credentials as { username: string; password: string };

        // LOGIN API HERE
        // const res = await fetch('', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     username,
        //     password,
        //   }),
        // });

        // MOCK API
        const res = await fetch('https://api.nationalize.io?name=nathaniel', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const test = (await res.json()) as User;

        const user = {
          id: 2,
          name: username,
          email: 'abc@xyz.com',
          accessToken:
            '=gjACwjJBLLo7dLQ7M3RdyqQbaqp62Dv3QGb=qCbNNEIHe-/kj?E37IWFqdBf4!tbFYsGni/fVp?z1/dlVDzPB/k8D/fjmJ9j0Hho=l41Oe9s?U8v-OHuV9B97oGoC1OPBUi9zC6=hvyKY71Mo4zUGRAOYlIX/NkpJHm!klsM5RruOXZ!k=sNsH9qDz9gxNtQRgXYyaZv7YI27uM2-k=KPOKqP/E9OiBl?q6TOM6EElA/dx?Cf5!/jpWG6nykNYv',
        };

        if (res.ok && !!user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};
export default NextAuth(authOptions);
