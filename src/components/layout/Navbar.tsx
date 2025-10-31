import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Search, Library, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();

  // const navItems = [
  //   { path: "/", icon: Home, label: "首頁" },
  //   { path: "/marketplace", icon: Search, label: "探索" },
  //   { path: "/bookshelf", icon: Library, label: "書架" },
  // ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReadFi</span>
          </Link>

          {/* <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white dark:text-black" : ""
                    }`}
                  />
                  <span
                    className={`hidden sm:inline ${
                      isActive ? "text-white dark:text-black" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div> */}

          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* <ModeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
