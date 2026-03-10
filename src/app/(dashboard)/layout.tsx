import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className={jetbrainsMono.variable}>{children}</div>;
}
