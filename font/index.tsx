import { Geist, Geist_Mono, Poppins } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Define desired weights
  style: ["normal", "italic"],         // Optional: Define styles if needed
  subsets: ["latin", "latin-ext"],     // Optional: Include specific subsets
  variable: "--font-poppins",          // Optional: CSS variable name
  display: "swap",                     // Optional: Fallback font strategy
});

export { geistSans, geistMono, poppins };
