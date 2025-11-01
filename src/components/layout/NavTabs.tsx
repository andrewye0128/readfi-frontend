import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Store,
  BookOpen,
  ShoppingBag,
  Users,
  Upload,
  Wallet,
} from "lucide-react";

export default function NavTabs() {
  const location = useLocation();

  const tabs = [
    { key: "home", path: "/", label: "首頁", icon: Home },
    { key: "discover", path: "/marketplace", label: "探索", icon: Store },
    { key: "bookshelf", path: "/bookshelf", label: "我的書櫃", icon: BookOpen },
    {
      key: "marketplace2",
      path: "/resale",
      label: "二手市場",
      icon: ShoppingBag,
    },
    { key: "wallet", path: "/wallet", label: "我的錢包", icon: Wallet },
    { key: "governance", path: "/governance", label: "DAO 治理", icon: Users },
    { key: "creator", path: "/creator", label: "創作者後台", icon: Upload },
  ];

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(({ key, path, label, icon: Icon }) => (
            <Link
              key={key}
              to={path}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                isActive(path)
                  ? "text-readfi-blue border-readfi-blue font-semibold"
                  : "text-muted-foreground border-transparent hover:text-readfi-blue hover:border-readfi-blue/30"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
