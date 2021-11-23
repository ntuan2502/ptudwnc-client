import Layout from "../components/Layout";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
// import store from "../myStore";
// import { Provider } from "react-redux";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <Provider store={store}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    // </Provider>
  );
}

export default MyApp;
