import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kitchen 12A",
  description: "Dorm Kitchen Management App",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kitchen 12A",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header glass glass-panel" style={{ marginBottom: '32px', padding: '16px 24px' }}>
            <h1>Kitchen 12A</h1>
            <nav className="nav">
              <a href="/" className="active">Duty</a>
              <a href="/shopping">Shopping</a>
              <a href="/fund">Fund</a>
              <a href="/fridge">Fridge</a>
              <a href="/board">Board</a>
              <a href="/wiki">Wiki</a>
              <a href="/issues">Issues</a>
              <a href="/stats">Stats</a>
            </nav>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
