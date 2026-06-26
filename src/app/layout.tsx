import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tung.NT — Real Estate Photo Editing",
  description:
    "Professional real estate photo editing from Vietnam — HDR, Flash Blend, Day to Dusk, Virtual Staging, Twilight, object removal and renovation. Fast 24-hour turnaround, fair pricing.",
  metadataBase: new URL("https://professionalrealestatephotoediting.com"),
  openGraph: {
    title: "Tung.NT — Real Estate Photo Editing",
    description:
      "Professional real estate photo editing — editors from Vietnam. 24-hour turnaround.",
    type: "website",
  },
};

const SITE = "https://professionalrealestatephotoediting.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tung.NT — Real Estate Photo Editing",
  alternateName: "Tung.NT",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  image: `${SITE}/img/hrl/about.jpg`,
  description:
    "Professional real estate photo editing from Vietnam — HDR, Flash Blend, Day to Dusk, Virtual Staging, Twilight, object removal and renovation.",
  email: "tung.nt2642000@gmail.com",
  telephone: "+84387575008",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Đội 1, thôn Thái Bình, xã Vạn Thái, Ứng Hòa",
    addressLocality: "Hà Nội",
    addressCountry: "VN",
  },
  areaServed: ["US", "Australia", "UK", "Norway", "Canada", "Vietnam"],
  sameAs: [
    "https://www.instagram.com/thanhtungphotoediting/",
    "https://www.facebook.com/tung.thanh.355880/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
