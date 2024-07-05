import type { Metadata } from "next";
import { Source_Code_Pro, Open_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " bg-zinc-900 text-zinc-200 md:text-zinc-300"}>
                {children}
            </body>
        </html>
    );
}
