import type { Metadata } from "next";
import "./globals.css";
import { Home, ShoppingCart, PiggyBank, Refrigerator, ClipboardList, BookOpen, AlertTriangle, BarChart3 } from 'lucide-react';

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
              <a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Home size={20} />
                <span>Duty</span>
              </a>
              <a href="/shopping" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <ShoppingCart size={20} />
                <span>Shopping</span>
              </a>
              <a href="/fund" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <PiggyBank size={20} />
                <span>Fund</span>
              </a>
              <a href="/fridge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Refrigerator size={20} />
                <span>Fridge</span>
              </a>
              <a href="/board" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <ClipboardList size={20} />
                <span>Board</span>
              </a>
              <a href="/wiki" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={20} />
                <span>Wiki</span>
              </a>
              <a href="/issues" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={20} />
                <span>Issues</span>
              </a>
              <a href="/stats" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <BarChart3 size={20} />
                <span>Stats</span>
              </a>
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
