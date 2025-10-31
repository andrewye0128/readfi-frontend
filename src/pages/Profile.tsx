import { useState } from "react";
import {
  User,
  Wallet,
  Settings,
  Award,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const [readTokenBalance] = useState(1250);
  const [ethBalance] = useState(0.5);

  const userStats = {
    booksOwned: 12,
    booksRead: 8,
    readingTime: 2450, // minutes
    tokensEarned: 3250,
    level: 5,
    xp: 650,
    nextLevelXp: 1000,
  };

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      title: "購買《時間的旅人》",
      timestamp: "2024-03-15 14:30",
      amount: -249,
    },
    {
      id: 2,
      type: "reward",
      title: "閱讀獎勵",
      timestamp: "2024-03-14 20:15",
      amount: +50,
    },
    {
      id: 3,
      type: "sale",
      title: "出售《帝國興衰錄》",
      timestamp: "2024-03-13 10:20",
      amount: +399,
    },
    {
      id: 4,
      type: "reward",
      title: "完成閱讀挑戰",
      timestamp: "2024-03-12 18:45",
      amount: +100,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-linear-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">讀者 #7281</h1>
              <p className="text-muted-foreground mb-4">0x742d...8f3a</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-black text-white">
                  <Award className="w-3 h-3 mr-1" />
                  等級 {userStats.level}
                </Badge>
                <Badge variant="secondary">
                  📚 收藏 {userStats.booksOwned} 本
                </Badge>
                <Badge variant="secondary">
                  ✅ 完成 {userStats.booksRead} 本
                </Badge>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              編輯個人資料
            </Button>
          </div>

          {/* Level Progress */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                等級進度 ({userStats.xp}/{userStats.nextLevelXp} XP)
              </span>
              <span className="font-semibold">
                {Math.floor((userStats.xp / userStats.nextLevelXp) * 100)}%
              </span>
            </div>
            <Progress
              value={(userStats.xp / userStats.nextLevelXp) * 100}
              className="h-3"
            />
          </div>
        </div>

        {/* Wallet Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">READ 代幣餘額</h3>
                  <p className="text-xs text-muted-foreground">閱讀獎勵代幣</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">{readTokenBalance}</span>
              <span className="text-muted-foreground">READ</span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-black hover:bg-black/90 text-white">
                充值
              </Button>
              <Button variant="outline" className="flex-1">
                提現
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Ξ</span>
                </div>
                <div>
                  <h3 className="font-semibold">ETH 錢包</h3>
                  <p className="text-xs text-muted-foreground">以太坊主網</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">{ethBalance}</span>
              <span className="text-muted-foreground">ETH</span>
            </div>
            <Button variant="outline" className="w-full">
              連接錢包
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold mb-1">{userStats.booksOwned}</p>
            <p className="text-sm text-muted-foreground">擁有書籍</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold mb-1">
              {Math.floor(userStats.readingTime / 60)}h
            </p>
            <p className="text-sm text-muted-foreground">閱讀時長</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold mb-1">{userStats.tokensEarned}</p>
            <p className="text-sm text-muted-foreground">賺取代幣</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold mb-1">等級 {userStats.level}</p>
            <p className="text-sm text-muted-foreground">讀者等級</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-6">最近活動</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    activity.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.amount > 0 ? "+" : ""}
                  {activity.amount} READ
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
