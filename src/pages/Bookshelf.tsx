import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Grid,
  List,
  Search,
  Gift,
  Tag,
  Eye,
  Clock,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from "@/lib/toast";
import { mockBooks } from "@/data/mockData";

// Mock user bookshelf data
const myBooks = [
  {
    id: mockBooks[0].id,
    book: mockBooks[0],
    progress: 65,
    lastRead: "2 天前",
    lastReadAt: "2024-03-15",
    readingTime: 1240,
    nftId: "#7281",
    bookmarked: true,
  },
  {
    id: mockBooks[1].id,
    book: mockBooks[1],
    progress: 100,
    lastRead: "1 週前",
    lastReadAt: "2024-03-10",
    readingTime: 890,
    nftId: "#5392",
    bookmarked: false,
  },
  {
    id: mockBooks[2].id,
    book: mockBooks[2],
    progress: 34,
    lastRead: "昨天",
    lastReadAt: "2024-03-14",
    readingTime: 450,
    nftId: "#9184",
    bookmarked: true,
  },
  {
    id: mockBooks[3].id,
    book: mockBooks[3],
    progress: 0,
    lastRead: "尚未開始",
    lastReadAt: "",
    readingTime: 0,
    nftId: "#3847",
    bookmarked: false,
  },
];

export default function Bookshelf() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = myBooks.filter(
    (book) =>
      book.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadBook = (book: (typeof myBooks)[0]) => {
    navigate(
      `/reader/${book.book.id}/chapter/${book.book.chapters[0]?.id || ""}`
    );
  };

  const handleListForResale = (book: (typeof myBooks)[0]) => {
    toast.success(`《${book.book.title}》已上架至二手市場`);
  };

  const handleGiftBook = (book: (typeof myBooks)[0]) => {
    toast.success(`準備贈送《${book.book.title}》`);
  };

  const handleViewNFT = (book: (typeof myBooks)[0]) => {
    toast.success(`查看 NFT ${book.nftId} 詳情`);
  };

  const totalReadingTime = myBooks.reduce(
    (acc, book) => acc + (book.readingTime || 0),
    0
  );
  const completedBooks = myBooks.filter((book) => book.progress === 100).length;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">我的書架</h1>
        <p className="text-muted-foreground">管理您的閱讀清單和收藏的書籍</p>
      </div>

      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground">館藏數量</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {myBooks.length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground">閱讀時長</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.floor(totalReadingTime / 60)}h
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground">待領取獎勵</span>
            </div>
            <p className="text-3xl font-bold text-foreground">325</p>
            <p className="text-xs text-muted-foreground mt-1">READ 代幣</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground">已完成</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {completedBooks}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex-1 w-full relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              strokeWidth={2}
            />
            <Input
              placeholder="搜尋書櫃..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-card h-11 border-border"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-black hover:bg-black/90 text-white"
                  : ""
              }
            >
              <Grid className="w-4 h-4" strokeWidth={2} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list"
                  ? "bg-black hover:bg-black/90 text-white"
                  : ""
              }
            >
              <List className="w-4 h-4" strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Books Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-foreground/20 transition-all"
              >
                <div
                  className="relative aspect-[2/3] overflow-hidden bg-secondary cursor-pointer"
                  onClick={() => handleReadBook(book)}
                >
                  <ImageWithFallback
                    src={book.book.cover}
                    alt={book.book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 border-0"
                    >
                      開始閱讀
                    </Button>
                  </div>

                  {book.nftId && (
                    <Badge className="absolute top-2 right-2 bg-black text-white border-0 text-xs">
                      {book.nftId}
                    </Badge>
                  )}

                  {book.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-foreground line-clamp-2 text-sm font-semibold">
                      {book.book.title}
                    </h4>
                    <p className="text-muted-foreground text-xs line-clamp-1">
                      {book.book.author}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{book.progress}% 完成</span>
                    <span>{book.lastRead || "尚未開始"}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-sm"
                      >
                        管理
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleReadBook(book)}>
                        <BookOpen className="w-4 h-4 mr-2" strokeWidth={2} />
                        開始閱讀
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleListForResale(book)}
                      >
                        <Tag className="w-4 h-4 mr-2" strokeWidth={2} />
                        上架轉售
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleGiftBook(book)}>
                        <Gift className="w-4 h-4 mr-2" strokeWidth={2} />
                        贈送好友
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewNFT(book)}>
                        <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
                        查看 NFT
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Books List View */}
        {viewMode === "list" && (
          <div className="space-y-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-card rounded-xl p-5 border border-border hover:border-foreground/20 transition-all flex items-center gap-5"
              >
                <div
                  className="w-20 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0 cursor-pointer border border-border"
                  onClick={() => handleReadBook(book)}
                >
                  <ImageWithFallback
                    src={book.book.cover}
                    alt={book.book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-foreground truncate font-semibold">
                        {book.book.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {book.book.author}
                      </p>
                    </div>
                    {book.nftId && (
                      <Badge className="bg-secondary text-foreground border-border ml-2">
                        {book.nftId}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>進度：{book.progress}%</span>
                      <span>上次閱讀：{book.lastRead || "尚未開始"}</span>
                      {book.readingTime !== undefined && (
                        <span>
                          時長：{Math.floor((book.readingTime || 0) / 60)}h{" "}
                          {(book.readingTime || 0) % 60}m
                        </span>
                      )}
                    </div>

                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleReadBook(book)}
                    className="bg-black hover:bg-black/90 text-white"
                  >
                    閱讀
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        管理
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleListForResale(book)}
                      >
                        <Tag className="w-4 h-4 mr-2" strokeWidth={2} />
                        上架轉售
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleGiftBook(book)}>
                        <Gift className="w-4 h-4 mr-2" strokeWidth={2} />
                        贈送好友
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewNFT(book)}>
                        <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
                        查看 NFT
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <BookOpen
              className="w-16 h-16 text-muted-foreground mx-auto mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-foreground mb-2">沒有找到書籍</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "試試其他搜尋關鍵字" : "前往探索頁面發掘新書"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
