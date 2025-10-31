import { Link } from "react-router-dom";
import BookCard from "@/components/BookCard";
import Layout from "@/components/layout/Layout";
import {
  featuredBooks,
  recentBooks,
  popularBooks,
  categories,
} from "@/data/mockData";
import { ChevronRight, TrendingUp, Flame, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative h-64 rounded-lg overflow-hidden bg-linear-to-r from-primary to-primary/60">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">
                歡迎來到 ReadFi
              </h1>
              <p className="text-xl mb-6 text-white/90">
                探索無盡的閱讀世界，發現屬於你的故事
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/marketplace"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  開始探索
                </Link>
                <Link
                  to="/bookshelf"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  我的書架
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">瀏覽分類</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/search?category=${category.name}`}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-lg hover:bg-accent transition-colors cursor-pointer border border-border"
            >
              <span className="text-4xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">精選推薦</h2>
          </div>
          <Link
            to="/search"
            className="flex items-center space-x-1 text-primary hover:underline"
          >
            <span>查看更多</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Recent Books */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">最新上架</h2>
          </div>
          <Link
            to="/marketplace"
            className="flex items-center space-x-1 text-primary hover:underline"
          >
            <span>查看更多</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {recentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Popular Books */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">熱門書籍</h2>
          </div>
          <Link
            to="/marketplace"
            className="flex items-center space-x-1 text-primary hover:underline"
          >
            <span>查看更多</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
