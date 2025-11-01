import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Filter, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { allBooks, categories } from "@/data/mockData";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [sortBy, setSortBy] = useState<"popular" | "new" | "price">("popular");

  const filteredAndSortedBooks = allBooks
    .filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "全部" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.readers || 0) - (a.readers || 0);
        case "new":
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
        case "price":
          return (a.readPrice || a.price || 0) - (b.readPrice || b.price || 0);
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">探索市場</h1>
            <p className="text-muted-foreground">發現最新、最熱門的 NFT 書籍</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedBooks.length} 本書籍
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-xl border border-border space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="搜尋書名或作者..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                篩選
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                排序
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`cursor-pointer transition-all ${
                selectedCategory === "全部"
                  ? "bg-readfi-blue text-white shadow-md"
                  : "bg-secondary text-foreground hover:bg-readfi-blue/10 hover:text-readfi-blue"
              }`}
              onClick={() => setSelectedCategory("全部")}
            >
              全部
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.name
                    ? "bg-readfi-blue text-white shadow-md"
                    : "bg-secondary text-foreground hover:bg-readfi-blue/10 hover:text-readfi-blue"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon} {category.name}
              </Badge>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <span className="text-sm text-muted-foreground self-center">
              排序：
            </span>
            {[
              { key: "popular", label: "最受歡迎" },
              { key: "new", label: "最新上架" },
              { key: "price", label: "價格" },
            ].map((option) => (
              <Button
                key={option.key}
                variant={sortBy === option.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(option.key as any)}
                className={
                  sortBy === option.key
                    ? "bg-black hover:bg-black/90 text-white"
                    : ""
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">找不到符合條件的書籍</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
