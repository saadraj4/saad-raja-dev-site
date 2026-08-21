import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Saad Raja — Full Stack Developer · Production Web Applications",
  description:
    "Full stack developer specializing in React, Next.js, and Node.js. I build and ship production web applications end to end — from idea to live product. UAE & Pakistan client experience.",
  openGraph: {
    title: "Saad Raja — Full Stack Developer",
    description:
      "I build and ship production web applications end to end. React, Next.js, Node.js, and more.",
    url: "https://saad-raja-dev-site.vercel.app",
    siteName: "Saad Raja",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saad Raja — Full Stack Developer",
    description:
      "I build and ship production web applications end to end.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ToastContainer />
        <Navbar />
        <main className="min-h-screen">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      </body>
    </html>
  );
}
