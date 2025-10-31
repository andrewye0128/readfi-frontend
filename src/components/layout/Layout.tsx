import { ReactNode } from "react";
import Navbar from "./Navbar";
import NavTabs from "./NavTabs";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const hideTabs = location.pathname.startsWith("/reader");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!hideTabs && <NavTabs />}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
