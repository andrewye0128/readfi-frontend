import { Book, BookCategory } from "@/types";

export const categories: BookCategory[] = [
  { id: "1", name: "小說", icon: "📚" },
  { id: "2", name: "科幻", icon: "🚀" },
  { id: "3", name: "懸疑", icon: "🔍" },
  { id: "4", name: "歷史", icon: "📜" },
  { id: "5", name: "文學", icon: "✍️" },
];

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "時間的旅人",
    author: "陳文華",
    cover: "https://via.placeholder.com/200x300?text=時間的旅人",
    description:
      "一部穿越時空的奇幻小說，講述主角如何在不同時代間穿梭，尋找失去的記憶與真相。",
    category: "科幻",
    rating: 4.5,
    price: 299,
    readPrice: 249,
    readers: 12500,
    royalty: 15,
    isNew: true,
    isHot: true,
    chapters: [
      {
        id: "1-1",
        title: "第一章：意外的旅程",
        content:
          "那是一個普通的下午，李明走進了一家古董店。他從未想過，這次的探訪會改變他的一生...",
        order: 1,
      },
      {
        id: "1-2",
        title: "第二章：時空之門",
        content:
          "當他的手觸碰到那面古老的鏡子時，整個世界開始旋轉。當他再次睜開眼睛，已經來到了另一個時代...",
        order: 2,
      },
    ],
    tags: ["時空穿越", "冒險", "奇幻"],
    publishDate: "2024-01-15",
    totalPages: 320,
  },
  {
    id: "2",
    title: "城市邊緣的謀殺案",
    author: "張敏",
    cover: "https://via.placeholder.com/200x300?text=城市邊緣的謀殺案",
    description:
      "當一具屍體在城市邊緣被發現時，警探王強必須在有限的線索中找出真相。",
    category: "懸疑",
    rating: 4.8,
    price: 349,
    readers: 18200,
    royalty: 12,
    isHot: true,
    chapters: [
      {
        id: "2-1",
        title: "第一章：案發現場",
        content:
          "清晨的霧氣還未散去，警車的警笛聲劃破了寧靜。王強推開警戒線，走向那個改變一切的現場...",
        order: 1,
      },
    ],
    tags: ["推理", "懸疑", "犯罪"],
    publishDate: "2024-02-20",
    totalPages: 280,
  },
  {
    id: "3",
    title: "帝國興衰錄",
    author: "劉建國",
    cover: "https://via.placeholder.com/200x300?text=帝國興衰錄",
    description: "一部跨越三個朝代的歷史小說，描繪了帝國的崛起、繁榮與衰落。",
    category: "歷史",
    rating: 4.7,
    price: 399,
    readers: 9800,
    royalty: 20,
    isOwned: true,
    chapters: [
      {
        id: "3-1",
        title: "第一章：開國之君",
        content:
          "在那個動盪的年代，一位年輕的將領站了出來，他將建立一個延續三百年的帝國...",
        order: 1,
      },
    ],
    tags: ["歷史", "戰爭", "政治"],
    publishDate: "2023-12-10",
    totalPages: 450,
  },
  {
    id: "4",
    title: "星辰大海",
    author: "林宇航",
    cover: "https://via.placeholder.com/200x300?text=星辰大海",
    description: "人類首次前往比鄰星的旅程，充滿了未知與挑戰。",
    category: "科幻",
    rating: 4.9,
    price: 279,
    readers: 21500,
    royalty: 18,
    isNew: true,
    isHot: true,
    chapters: [
      {
        id: "4-1",
        title: "第一章：啟程",
        content:
          "2075年，人類的第一艘超光速飛船準備啟航。船長李星辰站在指揮台上，望著遠方的星辰...",
        order: 1,
      },
    ],
    tags: ["太空", "探索", "未來"],
    publishDate: "2024-03-05",
    totalPages: 380,
  },
  {
    id: "5",
    title: "詩意人生",
    author: "王詩雅",
    cover: "https://via.placeholder.com/200x300?text=詩意人生",
    description: "一位詩人的心路歷程，記錄了人生的起起伏伏與對美的追求。",
    category: "文學",
    rating: 4.6,
    price: 199,
    readers: 7200,
    royalty: 10,
    chapters: [
      {
        id: "5-1",
        title: "第一章：初見詩意",
        content:
          "年輕的王詩雅第一次接觸到詩歌時，就被那優美的文字深深吸引。從那一刻起，她知道這就是她的人生...",
        order: 1,
      },
    ],
    tags: ["文學", "詩歌", "人生"],
    publishDate: "2024-01-30",
    totalPages: 260,
  },
  {
    id: "6",
    title: "記憶迷宮",
    author: "黃智明",
    cover: "https://via.placeholder.com/200x300?text=記憶迷宮",
    description: "當記憶可以儲存和刪除時，我們還算是真正的自己嗎？",
    category: "懸疑",
    rating: 4.7,
    price: 329,
    readPrice: 279,
    readers: 15600,
    royalty: 14,
    isHot: true,
    chapters: [
      {
        id: "6-1",
        title: "第一章：遺失的記憶",
        content:
          "醒來的時候，張明發現自己躺在醫院的病床上，卻完全不記得發生了什麼事...",
        order: 1,
      },
    ],
    tags: ["懸疑", "科幻", "心理"],
    publishDate: "2024-02-15",
    totalPages: 340,
  },
];

// 擴充更多書籍資料
const additionalBooks: Book[] = [
  {
    id: "7",
    title: "區塊鏈革命",
    author: "Don Tapscott",
    cover: "https://via.placeholder.com/200x300?text=區塊鏈革命",
    description: "深入探討區塊鏈技術如何改變商業、政府與社會的運作方式。",
    category: "科幻",
    rating: 4.4,
    price: 350,
    readPrice: 315,
    readers: 8900,
    royalty: 16,
    isNew: true,
    chapters: [
      {
        id: "7-1",
        title: "第一章：新時代的開端",
        content: "區塊鏈技術的誕生，標誌著一個去中心化時代的到來...",
        order: 1,
      },
    ],
    tags: ["科技", "區塊鏈", "未來"],
    publishDate: "2024-03-20",
    totalPages: 420,
  },
  {
    id: "8",
    title: "深夜食堂",
    author: "安倍夜郎",
    cover: "https://via.placeholder.com/200x300?text=深夜食堂",
    description: "一家只在深夜營業的小食堂，每道料理背後都藏著溫暖的人生故事。",
    category: "文學",
    rating: 4.8,
    price: 220,
    readers: 25000,
    royalty: 12,
    isHot: true,
    chapters: [
      {
        id: "8-1",
        title: "第一夜：豬肉味噌湯",
        content: "深夜十二點，食堂的暖簾輕輕飄動，第一位客人推門而入...",
        order: 1,
      },
    ],
    tags: ["溫馨", "美食", "人生"],
    publishDate: "2023-11-15",
    totalPages: 180,
  },
  {
    id: "9",
    title: "未來簡史",
    author: "Yuval Noah Harari",
    cover: "https://via.placeholder.com/200x300?text=未來簡史",
    description: "從智人到神人，探討人類未來發展的可能性與挑戰。",
    category: "歷史",
    rating: 4.7,
    price: 380,
    readPrice: 340,
    readers: 16500,
    royalty: 18,
    isNew: true,
    chapters: [
      {
        id: "9-1",
        title: "第一章：人類的新議程",
        content: "在戰勝了飢荒、瘟疫與戰爭後，人類將面對什麼樣的新挑戰？",
        order: 1,
      },
    ],
    tags: ["歷史", "未來", "哲學"],
    publishDate: "2024-02-10",
    totalPages: 480,
  },
  {
    id: "10",
    title: "被討厭的勇氣",
    author: "岸見一郎",
    cover: "https://via.placeholder.com/200x300?text=被討厭的勇氣",
    description: "透過阿德勒心理學，學習如何獲得真正的自由與幸福。",
    category: "文學",
    rating: 4.6,
    price: 280,
    readers: 32000,
    royalty: 14,
    isHot: true,
    isOwned: true,
    chapters: [
      {
        id: "10-1",
        title: "第一夜：我們的不幸是誰的錯？",
        content: "年輕人來到哲學家的書房，開始了一場改變人生的對話...",
        order: 1,
      },
    ],
    tags: ["心理", "自我成長", "哲學"],
    publishDate: "2023-10-20",
    totalPages: 320,
  },
];

export const allBooks = [...mockBooks, ...additionalBooks];

export const featuredBooks = allBooks.filter((book) => book.isHot).slice(0, 6);
export const recentBooks = allBooks.filter((book) => book.isNew).slice(0, 6);
export const popularBooks = allBooks
  .sort((a, b) => (b.readers || 0) - (a.readers || 0))
  .slice(0, 6);
