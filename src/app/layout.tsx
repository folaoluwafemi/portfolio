import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { manrope, splineSans } from "@core/design_system/theme/Fonts";
import { ThemeProvider } from "@core/design_system/theme/Theme";
import { themeScript } from "@core/design_system/theme/theme-script";

const siteName = "Fola Oluwafemi — Portfolio";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description:
    "Portfolio of Fola Oluwafemi — a mobile software developer specializing in Flutter, with a strong background in Kotlin.",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/Icon-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: siteName,
    description:
      "Portfolio of Fola Oluwafemi — a mobile software developer specializing in Flutter, with a strong background in Kotlin.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${manrope.variable} ${splineSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      <body className="bg-surface-primary font-body text-content-strong antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
