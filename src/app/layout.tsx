import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tung.NT — Real Estate Photo Editing",
  description:
    "Professional real estate photo editing from Vietnam — HDR, Flash Blend, Day to Dusk, Virtual Staging, Twilight, object removal and renovation. Fast 24-hour turnaround, fair pricing.",
  metadataBase: new URL("https://tung-nt.com"),
  openGraph: {
    title: "Tung.NT — Real Estate Photo Editing",
    description:
      "Professional real estate photo editing — editors from Vietnam. 24-hour turnaround.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
