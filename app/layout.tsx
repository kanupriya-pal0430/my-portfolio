import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanupriya Pal — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 5+ years building scalable React.js & Next.js applications. Expert in microfrontend architecture, performance optimization & design systems.",
  keywords: [
    "Frontend Engineer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Microfrontend",
    "Remote",
    "Kanupriya Pal",
  ],
  authors: [{ name: "Kanupriya Pal" }],
  openGraph: {
    title: "Kanupriya Pal — Senior Frontend Engineer",
    description:
      "5+ years building scalable React.js & Next.js apps. Open to remote opportunities with EST overlap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
