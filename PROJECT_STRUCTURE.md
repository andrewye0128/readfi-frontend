# ReadFi 專案架構說明

## 專案概述

ReadFi 是一個基於區塊鏈的 NFT 閱讀平台，讓讀者可以購買、收藏、閱讀書籍 NFT，並透過閱讀賺取 READ 代幣獎勵。

## 技術棧

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: React Router Dom 7
- **Icons**: Lucide React
- **Theme**: next-themes (深色/淺色主題切換)

## 專案結構

```
readfi-frontend/
├── src/
│   ├── components/           # 元件
│   │   ├── layout/          # 佈局元件
│   │   │   ├── Layout.tsx   # 主佈局
│   │   │   └── Navbar.tsx   # 導航欄
│   │   ├── ui/              # UI 基礎元件
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   └── progress.tsx
│   │   ├── figma/           # Figma 相關元件
│   │   │   └── ImageWithFallback.tsx
│   │   ├── BookCard.tsx     # 書籍卡片
│   │   ├── mode-toggle.tsx  # 主題切換
│   │   └── theme-provider.tsx
│   ├── pages/               # 頁面
│   │   ├── Home.tsx         # 首頁
│   │   ├── Marketplace.tsx  # 探索/市場頁面
│   │   ├── BookDetail.tsx   # 書籍詳情頁
│   │   ├── Bookshelf.tsx    # 書架頁面
│   │   ├── Reader.tsx       # 閱讀器頁面
│   │   ├── Profile.tsx      # 個人資料/錢包頁面
│   │   ├── Search.tsx       # 搜尋頁面
│   │   └── error-pages/
│   │       └── NotFound.tsx # 404 頁面
│   ├── data/                # 資料
│   │   └── mockData.ts      # 假資料 (10本書籍)
│   ├── types/               # 型別定義
│   │   └── index.ts
│   ├── lib/                 # 工具函式
│   │   ├── utils.ts
│   │   └── toast.ts         # Toast 通知
│   ├── router/              # 路由
│   │   └── router.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── dist/                    # 建置輸出
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 主要功能頁面

### 1. 首頁 (`/`)

- Hero Banner 區塊
- 分類瀏覽 (5 個分類)
- 精選推薦書籍
- 最新上架書籍
- 熱門書籍

### 2. 探索/市場 (`/marketplace`)

- 搜尋功能
- 分類篩選
- 排序選項 (最受歡迎、最新上架、價格)
- 書籍網格展示
- 完整的 10 本書籍資料

### 3. 書籍詳情 (`/book/:id`)

- 書籍封面與資訊
- 評分、讀者數、版稅統計
- 內容簡介與標籤
- 版稅機制說明
- 購買選項 (READ 代幣 / 其他支付)
- NFT 擁有權益說明
- 章節目錄
- 行動按鈕 (開始閱讀、加入書架)

### 4. 書架 (`/bookshelf`)

- 統計卡片 (館藏數量、閱讀時長、待領取獎勵、已完成)
- 搜尋功能
- 視圖切換 (網格/列表)
- 書籍管理下拉選單 (閱讀、上架轉售、贈送、查看 NFT)
- NFT ID 顯示
- 閱讀進度條

### 5. 閱讀器 (`/reader/:bookId/chapter/:chapterId`)

- 章節內容顯示
- 字體大小調整
- 上下章節導航
- 返回目錄

### 6. 個人資料/錢包 (`/profile`)

- 用戶資訊 (頭像、地址、等級、徽章)
- READ 代幣錢包 (餘額、充值、提現)
- ETH 錢包 (餘額、連接錢包)
- 統計數據 (擁有書籍、閱讀時長、賺取代幣、讀者等級)
- 最近活動記錄
- 等級進度條

### 7. 搜尋 (`/search`)

- 搜尋輸入框
- 分類篩選
- 搜尋結果展示
- 即時篩選

## 資料結構

### Book (書籍)

```typescript
{
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  category: string;
  rating: number;
  chapters: Chapter[];
  tags: string[];
  publishDate: string;
  totalPages: number;
  price?: number;        // 原價
  readPrice?: number;    // 折扣價
  readers?: number;      // 讀者數
  isNew?: boolean;       // 新書標記
  isHot?: boolean;       // 熱門標記
  isOwned?: boolean;     // 已擁有標記
  royalty?: number;      // 版稅百分比
}
```

### UserBook (用戶書籍)

```typescript
{
  bookId: string;
  book: Book;
  progress: number;      // 閱讀進度 (%)
  lastReadAt: string;    // 最後閱讀時間
  lastRead?: string;     // 格式化時間顯示
  bookmarked: boolean;   // 是否收藏
  readingTime?: number;  // 閱讀時長 (分鐘)
  nftId?: string;        // NFT ID
}
```

## 導航結構

- 首頁 (/)
- 探索 (/marketplace)
- 書架 (/bookshelf)
- 個人資料 (/profile)
- 主題切換

## 假資料概要

- **書籍總數**: 10 本
- **分類**: 小說、科幻、懸疑、歷史、文學
- **特色書籍**:
  1. 時間的旅人 - 科幻 (新書、熱門)
  2. 城市邊緣的謀殺案 - 懸疑 (熱門)
  3. 帝國興衰錄 - 歷史 (已擁有)
  4. 星辰大海 - 科幻 (新書、熱門)
  5. 詩意人生 - 文學
  6. 記憶迷宮 - 懸疑 (熱門)
  7. 區塊鏈革命 - 科幻 (新書)
  8. 深夜食堂 - 文學 (熱門)
  9. 未來簡史 - 歷史 (新書)
  10. 被討厭的勇氣 - 文學 (熱門、已擁有)

## UI 元件庫

- Badge (標籤)
- Button (按鈕 - default/outline/sm/icon)
- Dialog (對話框)
- DropdownMenu (下拉選單)
- Input (輸入框)
- Progress (進度條)
- ImageWithFallback (圖片備援)

## 主題支援

- 深色模式
- 淺色模式
- 系統預設

## 部署設定

- Base Path: `/readfi-frontend/`
- GitHub Pages 支援
- 自動部署腳本

## 開發指令

```bash
npm run dev       # 開發伺服器
npm run build     # 建置專案
npm run preview   # 預覽建置結果
npm run verify    # 部署前驗證
npm run deploy    # 部署至 GitHub Pages
```

## 特色功能

1. **NFT 書籍系統** - 每本書都是 NFT，可轉售、贈送
2. **版稅機制** - 二手交易時原作者獲得版稅
3. **閱讀獎勵** - 閱讀時賺取 READ 代幣
4. **書架管理** - 完整的書籍管理功能
5. **個人錢包** - READ 代幣與 ETH 錢包整合
6. **等級系統** - 讀者等級與經驗值
7. **主題切換** - 深色/淺色模式
8. **響應式設計** - 支援各種螢幕尺寸

## 未來擴充方向

- 優化閱讀器 (書籤、筆記、劃線)
- 加入更多 UI 元件 (tabs、select、textarea)
- 社群功能 (評論、討論)
- 推薦系統
- 閱讀挑戰與成就系統
- Web3 錢包整合
- 智能合約互動
