'use client';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store";
import SheetsFetcher from "@/lib/SheetsFetcher";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <SheetsFetcher />
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
