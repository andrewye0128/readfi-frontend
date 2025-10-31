import { useState } from "react";
import {
  Upload,
  BookOpen,
  TrendingUp,
  DollarSign,
  BarChart3,
  Plus,
  Star,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from "@/lib/toast";

const myPublishedBooks = [
  {
    id: 1,
    title: "區塊鏈技術指南",
    cover: "https://via.placeholder.com/400x600?text=區塊鏈技術指南",
    sales: 1250,
    revenue: 187500,
    royaltyIncome: 34200,
    readers: 8900,
    rating: 4.7,
    publishDate: "2024-08-15",
  },
  {
    id: 2,
    title: "Web3 開發實戰",
    cover: "https://via.placeholder.com/400x600?text=Web3+開發實戰",
    sales: 890,
    revenue: 156200,
    royaltyIncome: 18600,
    readers: 6500,
    rating: 4.6,
    publishDate: "2024-09-20",
  },
];

export default function Creator() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [royaltyRate, setRoyaltyRate] = useState([10]);
  const [mintAmount, setMintAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const totalRevenue = myPublishedBooks.reduce(
    (acc, book) => acc + book.revenue,
    0
  );
  const totalRoyalty = myPublishedBooks.reduce(
    (acc, book) => acc + book.royaltyIncome,
    0
  );
  const totalSales = myPublishedBooks.reduce(
    (acc, book) => acc + book.sales,
    0
  );

  const handlePublish = () => {
    if (!bookTitle || !bookAuthor || !bookDescription || !bookPrice) {
      toast.error("請填寫所有必要資訊");
      return;
    }

    const stake = parseFloat(stakeAmount);
    if (isNaN(stake) || stake < 500) {
      toast.error("發行書籍需要質押至少 500 READ 代幣");
      return;
    }

    toast.success(`成功發行《${bookTitle}》！NFT 鑄造中...`);

    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookPrice("");
    setMintAmount("");
    setStakeAmount("");
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white border border-border rounded-2xl p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              創作者後台
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            發行與管理您的作品
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            上傳書籍、設定價格與版稅，追蹤銷售表現
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-foreground" strokeWidth={2} />
                <span className="text-sm text-muted-foreground">
                  已發行書籍
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {myPublishedBooks.length}
              </p>
            </div>

            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp
                  className="w-5 h-5 text-foreground"
                  strokeWidth={2}
                />
                <span className="text-sm text-muted-foreground">總銷量</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {totalSales.toLocaleString()}
              </p>
            </div>

            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign
                  className="w-5 h-5 text-foreground"
                  strokeWidth={2}
                />
                <span className="text-sm text-muted-foreground">總收入</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">READ 代幣</p>
            </div>

            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3
                  className="w-5 h-5 text-foreground"
                  strokeWidth={2}
                />
                <span className="text-sm text-muted-foreground">版稅收入</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {totalRoyalty.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">二手交易</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="publish" className="space-y-6">
          <TabsList>
            <TabsTrigger value="publish" className="gap-2">
              <Plus className="w-4 h-4" strokeWidth={2} />
              發行新書
            </TabsTrigger>
            <TabsTrigger value="manage" className="gap-2">
              <BookOpen className="w-4 h-4" strokeWidth={2} />
              管理作品
            </TabsTrigger>
          </TabsList>

          <TabsContent value="publish">
            <div className="bg-white border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                發行新書
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground">
                      書名
                    </Label>
                    <Input
                      id="title"
                      placeholder="輸入書名"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      className="bg-white border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-foreground">
                      作者
                    </Label>
                    <Input
                      id="author"
                      placeholder="輸入作者名稱"
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      className="bg-white border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    內容簡介
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="描述您的作品..."
                    rows={4}
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                    className="bg-white border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-foreground">
                      定價（READ）
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="150"
                      value={bookPrice}
                      onChange={(e) => setBookPrice(e.target.value)}
                      className="bg-white border-border"
                    />
                    <p className="text-xs text-muted-foreground">
                      建議定價：100-300 READ
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mint" className="text-foreground">
                      鑄造數量
                    </Label>
                    <Input
                      id="mint"
                      type="number"
                      placeholder="1000"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                      className="bg-white border-border"
                    />
                    <p className="text-xs text-muted-foreground">
                      NFT 總發行量（可後續追加）
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">
                    二手交易版稅 ({royaltyRate[0]}%)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={royaltyRate}
                      onValueChange={setRoyaltyRate}
                      min={5}
                      max={25}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-foreground w-12">
                      {royaltyRate[0]}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    每次二手交易，您將獲得 {royaltyRate[0]}% 的版稅收入
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stake" className="text-foreground">
                    質押金額（READ）
                  </Label>
                  <Input
                    id="stake"
                    type="number"
                    placeholder="500"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="bg-white border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    發行書籍需要質押至少 500 READ 代幣作為保證金
                  </p>
                </div>

                <div className="bg-secondary rounded-xl p-5 border border-border">
                  <h4 className="text-foreground font-semibold mb-3">
                    上傳文件
                  </h4>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-foreground/20 transition-colors cursor-pointer">
                    <Upload
                      className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="text-foreground font-medium mb-1">
                      點擊上傳或拖放文件
                    </p>
                    <p className="text-sm text-muted-foreground">
                      支援格式：PDF, EPUB, MOBI（最大 50MB）
                    </p>
                  </div>
                </div>

                <div className="bg-secondary rounded-xl p-5 border border-border">
                  <h4 className="text-foreground font-semibold mb-3">
                    上傳封面
                  </h4>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-foreground/20 transition-colors cursor-pointer">
                    <Upload
                      className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="text-foreground font-medium mb-1">
                      點擊上傳封面圖片
                    </p>
                    <p className="text-sm text-muted-foreground">
                      建議尺寸：800x1200px，JPG 或 PNG 格式
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePublish}
                  className="w-full bg-black hover:bg-black/90 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" strokeWidth={2} />
                  發行書籍
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              {myPublishedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-border rounded-xl p-6 hover:border-foreground/20 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="w-32 h-44 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border">
                      <ImageWithFallback
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            發行日期：{book.publishDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-lg border border-border">
                          <Star
                            className="w-4 h-4 fill-black text-black"
                            strokeWidth={2}
                          />
                          <span className="font-semibold text-foreground">
                            {book.rating}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-secondary rounded-lg p-4 border border-border">
                          <p className="text-sm text-muted-foreground mb-1">
                            銷量
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            {book.sales}
                          </p>
                        </div>
                        <div className="bg-secondary rounded-lg p-4 border border-border">
                          <p className="text-sm text-muted-foreground mb-1">
                            收入
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            {book.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-secondary rounded-lg p-4 border border-border">
                          <p className="text-sm text-muted-foreground mb-1">
                            版稅
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            {book.royaltyIncome.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-secondary rounded-lg p-4 border border-border">
                          <p className="text-sm text-muted-foreground mb-1">
                            讀者
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            {book.readers.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-2" strokeWidth={2} />
                          查看數據
                        </Button>
                        <Button variant="outline" size="sm">
                          編輯資訊
                        </Button>
                        <Button variant="outline" size="sm">
                          追加鑄造
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
