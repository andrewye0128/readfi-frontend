export interface Book {
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
  // 新增屬性
  price?: number;
  readPrice?: number;
  readers?: number;
  isNew?: boolean;
  isHot?: boolean;
  isOwned?: boolean;
  royalty?: number; // 版稅百分比
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface BookCategory {
  id: string;
  name: string;
  icon: string;
}

export interface UserBook {
  bookId: string;
  book: Book;
  progress: number;
  lastReadAt: string;
  lastRead?: string; // 格式化後的時間顯示（如 "2 天前"）
  bookmarked: boolean;
  readingTime?: number; // 閱讀時長（分鐘）
  nftId?: string; // NFT ID
}
