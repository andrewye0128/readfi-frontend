import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Lock,
  Gift,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Coins,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/lib/toast";

const transactions = [
  {
    type: "earn",
    description: "閱讀挖礦獎勵",
    amount: 12.5,
    time: "2 小時前",
    book: "三體",
  },
  {
    type: "purchase",
    description: "購買書籍",
    amount: -150,
    time: "1 天前",
    book: "Clean Code 無瑕的程式碼",
  },
  {
    type: "sell",
    description: "出售書籍",
    amount: 120,
    time: "2 天前",
    book: "人類大歷史",
  },
  {
    type: "earn",
    description: "閱讀挖礦獎勵",
    amount: 8.3,
    time: "3 天前",
    book: "原子習慣",
  },
  {
    type: "royalty",
    description: "版稅收入",
    amount: 15.6,
    time: "4 天前",
    book: "三體（二手交易）",
  },
];

const stakingTiers = [
  { name: "銅牌會員", required: 1000, discount: 5, boost: 10, unlocked: true },
  {
    name: "銀牌會員",
    required: 5000,
    discount: 10,
    boost: 25,
    unlocked: true,
  },
  {
    name: "金牌會員",
    required: 10000,
    discount: 15,
    boost: 50,
    unlocked: false,
  },
  {
    name: "鑽石會員",
    required: 25000,
    discount: 20,
    boost: 100,
    unlocked: false,
  },
];

export default function WalletCenter() {
  const [stakeAmount, setStakeAmount] = useState("");
  const balance = 1234.56;
  const readingRewards = 325.8;
  const stakedAmount = 8500;
  const stakingRewards = 42.5;

  const currentTier = stakingTiers.findIndex(
    (tier) => stakedAmount < tier.required
  );
  const activeTier =
    currentTier === -1 ? stakingTiers.length - 1 : Math.max(0, currentTier - 1);
  const nextTier = stakingTiers[activeTier + 1];
  const tierProgress = nextTier
    ? (stakedAmount / nextTier.required) * 100
    : 100;

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("請輸入有效的質押數量");
      return;
    }
    if (amount > balance) {
      toast.error("餘額不足");
      return;
    }
    toast.success(`成功質押 ${amount} READ 代幣`);
    setStakeAmount("");
  };

  const handleUnstake = () => {
    toast.info("解除質押需要 7 天等待期");
  };

  const handleClaimRewards = () => {
    toast.success(`已領取 ${readingRewards.toFixed(2)} READ 閱讀獎勵`);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                READ 餘額
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">
              {balance.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ ${(balance * 0.5).toFixed(2)} USD
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                待領取獎勵
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-3">
              {readingRewards.toFixed(2)}
            </p>
            <Button
              size="sm"
              onClick={handleClaimRewards}
              className="bg-black hover:bg-black/90 text-white w-full"
            >
              領取獎勵
            </Button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                質押金額
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">
              {stakedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              賺取 {stakingTiers[activeTier].boost}% 加成
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                質押獎勵
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">
              {stakingRewards.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">APY 12.5%</p>
          </div>
        </div>

        {/* VIP Tier Progress */}
        <div className="bg-white border border-border rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-foreground">會員等級</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-semibold mb-1">
                  當前等級：
                  <span className="text-foreground">
                    {stakingTiers[activeTier].name}
                  </span>
                </p>
                {nextTier && (
                  <p className="text-sm text-muted-foreground">
                    距離 {nextTier.name} 還需質押{" "}
                    {(nextTier.required - stakedAmount).toLocaleString()} READ
                  </p>
                )}
              </div>
              <Badge className="bg-black text-white border-0">
                {stakingTiers[activeTier].discount}% 折扣
              </Badge>
            </div>

            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{stakedAmount.toLocaleString()} READ</span>
                  <span>{nextTier.required.toLocaleString()} READ</span>
                </div>
                <Progress value={tierProgress} className="h-2 bg-secondary" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {stakingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-xl p-4 border-2 transition-all ${
                    tier.unlocked
                      ? "border-black bg-secondary"
                      : "border-border bg-white opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Star
                      className={`w-4 h-4 ${
                        tier.unlocked
                          ? "text-black fill-black"
                          : "text-muted-foreground"
                      }`}
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {tier.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    需要 {tier.required.toLocaleString()} READ
                  </p>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline" className="text-xs border-border">
                      {tier.discount}% 折扣
                    </Badge>
                    <Badge variant="outline" className="text-xs border-border">
                      {tier.boost}% 加成
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="stake" className="space-y-6">
          <TabsList>
            <TabsTrigger value="stake" className="gap-2">
              <Coins className="w-4 h-4" strokeWidth={2} />
              質押
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              交易記錄
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4">
            <div className="bg-white border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                質押 READ 代幣
              </h3>

              <div className="bg-secondary rounded-xl p-5 space-y-2 mb-6 border border-border">
                <h4 className="text-foreground font-semibold">質押收益</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    <span>賺取 12.5% APY 的質押獎勵</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    <span>提升閱讀挖礦效率（最高 100%）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    <span>解鎖購書折扣（最高 20%）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    <span>獲得社群治理投票權</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    質押數量
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="輸入數量"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="flex-1 bg-white border-border"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setStakeAmount(balance.toString())}
                    >
                      最大
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    可用餘額：{balance.toFixed(2)} READ
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleStake}
                    className="flex-1 bg-black hover:bg-black/90 text-white"
                  >
                    質押代幣
                  </Button>
                  <Button
                    onClick={handleUnstake}
                    variant="outline"
                    className="flex-1"
                  >
                    解除質押
                  </Button>
                </div>

                <div className="bg-secondary border border-border rounded-xl p-4 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-foreground">⚠️</span>
                    <span>解除質押需要 7 天等待期，期間將不會獲得獎勵</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="bg-white border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                交易記錄
              </h3>

              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 bg-secondary rounded-xl hover:bg-border/50 transition-colors border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.type === "earn" ||
                          tx.type === "sell" ||
                          tx.type === "royalty"
                            ? "bg-black"
                            : "bg-border"
                        }`}
                      >
                        {tx.type === "earn" ||
                        tx.type === "sell" ||
                        tx.type === "royalty" ? (
                          <ArrowDownLeft
                            className="w-5 h-5 text-white"
                            strokeWidth={2}
                          />
                        ) : (
                          <ArrowUpRight
                            className="w-5 h-5 text-foreground"
                            strokeWidth={2}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          {tx.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tx.book}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          tx.amount > 0
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount} READ
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                查看更多
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
