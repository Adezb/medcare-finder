"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <title>MedCare Finder</title>
          <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Find hospitals around you with ease"
          />
        </head>
        <body>{children}</body>
      </html>
    </RecoilRoot>
  );
}

export default RootLayout;

// const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "Cek Top CareFinder",
//   description: "Find hospitals around you",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <RecoilRoot>
//       <html lang="en">
//         <body>{children}</body>
//       </html>
//     </RecoilRoot>
//   );
// }

// export { metadata };
