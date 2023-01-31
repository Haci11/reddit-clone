import "../styles/globals.scss";
import "../styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/sidebar";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Header />
        <main className="App">
          <div className="wrap">
            <div className="box">
              <Sidebar />
              <Component {...pageProps} />
            </div>
          </div>
        </main>
      </SessionProvider>
    </QueryClientProvider>
  );
}
