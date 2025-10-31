import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  Star,
  Users,
  Coins,
  TrendingUp,
  ShoppingCart,
  Zap,
  ArrowLeft,
  Play,
  Calendar,
  Tag,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { mockBooks } from "@/data/mockData";
import { toast } from "@/lib/toast";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">找不到這本書</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            返回首頁
          </Button>
        </div>
      </Layout>
    );
  }

  const handlePurchase = (withReadToken: boolean) => {
    const price = withReadToken ? book.readPrice || book.price : book.price;
    const currency = "READ";
    toast.success(`已購買《${book.title}》，共 ${price} ${currency}`);
  };

  return (
    <Layout>
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回
      </Button>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Book Cover */}
        <div className="space-y-5">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-secondary border border-border">
            <ImageWithFallback
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1.5 text-foreground mb-1">
                <Star
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  strokeWidth={2}
                />
                <span className="font-semibold">{book.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">評分</p>
            </div>
            <div className="bg-secondary rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1.5 text-foreground mb-1">
                <Users className="w-4 h-4" strokeWidth={2} />
                <span className="font-semibold">
                  {book.readers ? `${(book.readers / 1000).toFixed(1)}K` : "—"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">讀者</p>
            </div>
            <div className="bg-secondary rounded-xl p-4 border border-border text-center">
              <div className="flex items-center justify-center gap-1.5 text-foreground mb-1">
                <TrendingUp className="w-4 h-4" strokeWidth={2} />
                <span className="font-semibold">{book.royalty || 10}%</span>
              </div>
              <p className="text-xs text-muted-foreground">版稅</p>
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="text-muted-foreground">{book.author}</p>
              </div>
              <Badge className="bg-secondary text-foreground border-border">
                {book.category}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{book.publishDate}</span>
              </div>
              {book.totalPages && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{book.totalPages} 頁</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">內容簡介</h3>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              標籤
            </h3>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Royalty Info */}
          {book.royalty !== undefined && (
            <div className="bg-secondary rounded-xl p-5 border border-border space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <Coins className="w-5 h-5" strokeWidth={2} />
                <span className="font-semibold">版稅機制</span>
              </div>
              <p className="text-sm text-muted-foreground">
                每次二手交易，原作者將獲得 {book.royalty || 10}% 的版稅收入
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">作者版稅</span>
                  <span className="text-foreground font-medium">
                    {book.royalty || 10}%
                  </span>
                </div>
                <Progress
                  value={book.royalty || 10}
                  className="h-1.5 bg-border"
                />
              </div>
            </div>
          )}

          {/* Purchase Options */}
          {book.price !== undefined && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                購買選項
              </h3>

              {/* READ Token Purchase */}
              <div className="bg-secondary rounded-xl p-5 border-2 border-black">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-foreground" strokeWidth={2} />
                    <span className="font-semibold text-foreground">
                      使用 READ 代幣支付
                    </span>
                  </div>
                  {book.readPrice && book.readPrice < book.price && (
                    <Badge className="bg-black text-white border-0">
                      優惠 10%
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {book.readPrice || book.price}
                  </span>
                  <span className="text-muted-foreground">READ</span>
                  {book.readPrice && book.readPrice < book.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {book.price} READ
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => handlePurchase(true)}
                  className="w-full bg-black hover:bg-black/90 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" strokeWidth={2} />
                  使用 READ 代幣購買
                </Button>
              </div>

              {/* Regular Purchase */}
              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart
                    className="w-5 h-5 text-foreground"
                    strokeWidth={2}
                  />
                  <span className="font-semibold text-foreground">
                    其他支付方式
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {book.price}
                  </span>
                  <span className="text-muted-foreground">READ 或等值金額</span>
                </div>
                <Button
                  onClick={() => handlePurchase(false)}
                  variant="outline"
                  className="w-full"
                >
                  選擇支付方式
                </Button>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="bg-secondary rounded-xl p-5 border border-border">
            <h4 className="text-foreground font-semibold mb-3">NFT 擁有權益</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">✓</span>
                <span>永久擁有權，可自由轉售</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">✓</span>
                <span>閱讀時賺取 READ 代幣獎勵</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">✓</span>
                <span>跨平台同步閱讀進度</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">✓</span>
                <span>參與社群治理投票</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button
              onClick={() =>
                navigate(`/reader/${book.id}/chapter/${book.chapters[0].id}`)
              }
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              開始閱讀
            </Button>
            <Button variant="outline" className="flex-1">
              加入書架
            </Button>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">章節目錄</h2>
        <div className="grid gap-2">
          {book.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() =>
                navigate(`/reader/${book.id}/chapter/${chapter.id}`)
              }
              className="text-left p-4 bg-card rounded-lg hover:bg-accent transition-colors border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    第 {chapter.order} 章
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
