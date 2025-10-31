import { useState } from "react";
import { Search, TrendingUp, History } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketplaceCard from "@/components/MarketplaceCard";

const marketplaceBooks = [
  {
    id: 1,
    title: "人類大歷史",
    author: "Yuval Noah Harari",
    cover: "https://via.placeholder.com/200x300?text=人類大歷史",
    originalPrice: 180,
    currentPrice: 150,
    seller: "0x7a9f...3b2c",
    nftId: "#4721",
    royalty: 12,
    listed: "2 天前",
    previousOwners: 2,
  },
  {
    id: 2,
    title: "雪國",
    author: "川端康成",
    cover: "https://via.placeholder.com/200x300?text=雪國",
    originalPrice: 130,
    currentPrice: 95,
    seller: "0x4b8e...7d1a",
    nftId: "#8932",
    royalty: 8,
    listed: "5 天前",
    previousOwners: 1,
  },
  {
    id: 3,
    title: "午夜圖書館",
    author: "Matt Haig",
    cover: "https://via.placeholder.com/200x300?text=午夜圖書館",
    originalPrice: 140,
    currentPrice: 120,
    seller: "0x9c3f...6e5d",
    nftId: "#2847",
    royalty: 10,
    listed: "1 天前",
    previousOwners: 0,
  },
  {
    id: 4,
    title: "原子習慣",
    author: "James Clear",
    cover: "https://via.placeholder.com/200x300?text=原子習慣",
    originalPrice: 120,
    currentPrice: 100,
    seller: "0x2d7a...4f8b",
    nftId: "#5623",
    royalty: 8,
    listed: "3 天前",
    previousOwners: 3,
  },
];

const recentSales = [
  {
    book: "三體",
    price: 145,
    buyer: "0xa5c8...9d2f",
    seller: "0x7b3e...4c1a",
    time: "15 分鐘前",
    royalty: 14.5,
  },
  {
    book: "Clean Code 無瑕的程式碼",
    price: 185,
    buyer: "0x6d9f...2b7e",
    seller: "0x3a2c...8f4d",
    time: "1 小時前",
    royalty: 27.75,
  },
  {
    book: "原子習慣",
    price: 108,
    buyer: "0x4e7b...5a3c",
    seller: "0x9f2d...6b8a",
    time: "3 小時前",
    royalty: 8.64,
  },
  {
    book: "人類大歷史",
    price: 162,
    buyer: "0x8c3a...7d9f",
    seller: "0x5b6e...3a2d",
    time: "5 小時前",
    royalty: 19.44,
  },
];

export default function Resale() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = marketplaceBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white border border-border rounded-2xl p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              P2P 交易市場
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            買賣 NFT 電子書
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            探索由其他讀者出售的書籍，每筆交易自動分配版稅給原作者
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="bg-secondary rounded-xl p-5 border border-border">
              <p className="text-3xl font-bold text-foreground mb-1">
                {marketplaceBooks.length}
              </p>
              <p className="text-sm text-muted-foreground">上架書籍</p>
            </div>
            <div className="bg-secondary rounded-xl p-5 border border-border">
              <p className="text-3xl font-bold text-foreground mb-1">
                {recentSales.length}
              </p>
              <p className="text-sm text-muted-foreground">今日成交</p>
            </div>
            <div className="bg-secondary rounded-xl p-5 border border-border">
              <p className="text-3xl font-bold text-foreground mb-1">
                {recentSales
                  .reduce((acc, sale) => acc + sale.royalty, 0)
                  .toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">版稅總額</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            strokeWidth={2}
          />
          <Input
            placeholder="搜尋二手書..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 bg-white h-11 border-border"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketplace" className="gap-2">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              市場書籍
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" strokeWidth={2} />
              交易記錄
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge className="cursor-pointer whitespace-nowrap px-4 py-2 bg-black text-white hover:bg-black/90 border-black">
                全部
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer whitespace-nowrap px-4 py-2 bg-white text-foreground border-border hover:bg-secondary"
              >
                最新上架
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer whitespace-nowrap px-4 py-2 bg-white text-foreground border-border hover:bg-secondary"
              >
                價格最低
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer whitespace-nowrap px-4 py-2 bg-white text-foreground border-border hover:bg-secondary"
              >
                折扣最多
              </Badge>
            </div>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBooks.map((book) => (
                <MarketplaceCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        書籍
                      </th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        價格
                      </th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        買家
                      </th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        賣家
                      </th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        版稅
                      </th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold text-sm">
                        時間
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentSales.map((sale, index) => (
                      <tr
                        key={index}
                        className="hover:bg-secondary/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-medium">
                          {sale.book}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-foreground font-semibold">
                            {sale.price} READ
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs bg-secondary text-foreground px-2 py-1 rounded font-mono border border-border">
                            {sale.buyer}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs bg-secondary text-foreground px-2 py-1 rounded font-mono border border-border">
                            {sale.seller}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-foreground font-medium">
                            {sale.royalty} READ
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {sale.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
