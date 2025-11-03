import "./globals.scss";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { navMenus } from "@/data/navMenus";
import StructuredData from "@/components/common/StructuredData";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "arial",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Fira Sans",
    "Droid Sans",
  ],
});

export const metadata: Metadata = {
  title: "Suresh Suthar | Full Stack Developer | React.js, Next.js, Node.js Expert",
  description:
    "Professional Full Stack Developer specializing in React.js, Next.js, Node.js, MongoDB, and AWS. Building scalable web applications, e-commerce platforms, and modern digital solutions. Available for freelance projects.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      url: "/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/x-icon",
    },
    {
      url: "/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/android-chrome-192x192.png",
      rel: "icon",
      sizes: "64x64",
      type: "image/x-icon",
    },
  ],
  keywords: [
    "suresh suthar",
    "suresh suthar developer",
    "sksuthar",
    "suresh-suthar",
    "suthar suresh",
    "full stack developer",
    "full stack developer india",
    "react developer",
    "nextjs developer",
    "nodejs developer",
    "mongodb developer",
    "aws developer",
    "typescript developer",
    "javascript developer",
    "web developer",
    "backend developer",
    "frontend developer",
    "mern stack developer",
    "freelance developer",
    "indian developer",
    "suresh github",
    "portfolio developer",
    "web development services",
    "custom web applications",
    "e-commerce development",
    "responsive web design",
    "seo friendly websites"
  ],
  authors: [{ name: "Suresh Suthar", url: "https://suresh-suthar.vercel.app/" }],
  creator: "Suresh Suthar",
  publisher: "Suresh Suthar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://suresh-suthar.vercel.app"),
  alternates: {
    canonical: "https://suresh-suthar.vercel.app/",
  },
  openGraph: {
    title: 'Suresh Suthar | Full Stack JavaScript Developer',
    description:
      'Professional Full Stack Developer specializing in React.js, Next.js, Node.js, MongoDB, and AWS. Building scalable web applications, e-commerce platforms, and modern digital solutions. Available for freelance projects.',
    url: 'https://suresh-suthar.vercel.app/',
    siteName: 'Suresh Suthar Portfolio',
    images: [
      {
        url: 'https://suresh-suthar.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suresh Suthar - Full Stack Developer Portfolio',
      }
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suresh Suthar | Full Stack Developer | React.js, Next.js, Node.js Expert',
    description:
      'Professional Full Stack Developer specializing in React.js, Next.js, Node.js, MongoDB, and AWS. Building scalable web applications and modern digital solutions.',
    images: ['https://suresh-suthar.vercel.app/og-image.png'],
    creator: '@sksuthar',
  },
  verification: {
    google: 'google5cb727a6858ba8d4',
  },
};

const GoogleAnalytics = dynamic(
  () => import("@/components/common/GoogleAnalytics"),
  { ssr: false }
);
const WebVitals = dynamic(() => import("@/components/common/WebVitals"), {
  ssr: false,
});
const FloatingNavbar = dynamic(
  () => import("@/components/navbar/FloatingNavbar")
);
const ScrollToTop = dynamic(() => import("@/components/common/ScrollToTop"));

const isDebug = process.env.NODE_ENV === "development";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <StructuredData />
      </head>
      {isDebug ? null : <GoogleAnalytics />}

      <body className={isDebug ? "debug-screens" : ""}>
        {isDebug ? <WebVitals /> : null}
        <FloatingNavbar className="app_nav" navItems={navMenus} />
        <main>{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
