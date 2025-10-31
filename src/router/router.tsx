import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import BookDetail from "@/pages/BookDetail";
import Reader from "@/pages/Reader";
import Bookshelf from "@/pages/Bookshelf";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Resale from "@/pages/Resale";
import Governance from "@/pages/Governance";
import Creator from "@/pages/Creator";
import WalletCenter from "@/pages/WalletCenter";
import NotFound from "@/pages/error-pages/NotFound";

export default function Router() {
  // 從 vite.config.ts 的 base 設定取得 basename
  // 開發環境和生產環境都使用相同的 base path
  const basename = "/readfi-frontend";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/reader/:bookId/chapter/:chapterId" element={<Reader />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/resale" element={<Resale />} />
        <Route path="/wallet" element={<WalletCenter />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
