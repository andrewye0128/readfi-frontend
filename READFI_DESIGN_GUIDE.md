# 🎨 ReadFi 網站色彩計畫與視覺設計指南

> 根據 [ReadFi 視覺設計指南](https://manus.im/share/file/6fd11c0d-4d68-4a5c-86ef-1759ad42c1b1) 實作

## 📋 品牌色彩系統

### 主要色彩

#### 🔵 ReadFi Blue（主色）

- **色碼**: `#4A90E2`
- **HSL**: `hsl(210 79% 58%)`
- **用途**: 品牌識別、主要按鈕、連結、Logo
- **象徵**: 信任、專業、科技感
- **CSS 變數**: `--primary`
- **工具類別**: `.bg-readfi-blue`, `.text-readfi-blue`, `.border-readfi-blue`

#### 🟠 ReadFi Orange（強調色）

- **色碼**: `#FF6B35`
- **HSL**: `hsl(15 100% 60%)`
- **用途**: 行動呼籲（CTA）、強調元素、圖示提示
- **象徵**: 活力、創新、熱情
- **CSS 變數**: `--accent`
- **工具類別**: `.bg-readfi-orange`, `.text-readfi-orange`, `.border-readfi-orange`

---

### 次要色彩

#### 🟢 綠色（成功/獎勵）

- **色碼**: `#2ECC71`
- **HSL**: `hsl(145 63% 49%)`
- **用途**: 成功訊息、閱讀獎勵、完成進度
- **象徵**: 成功、成長、獎勵
- **CSS 變數**: `--success`
- **工具類別**: `.bg-success`, `.text-success`, `.border-success`

#### 🟣 紫色（特殊/NFT）

- **色碼**: `#9B59B6`
- **HSL**: `hsl(283 39% 53%)`
- **用途**: NFT 標記、限量版、特殊功能
- **象徵**: 尊貴、獨特、數位資產
- **CSS 變數**: `--special`
- **工具類別**: `.bg-special`, `.text-special`, `.border-special`

#### 🟡 黃色（警示）

- **色碼**: `#F39C12`
- **HSL**: `hsl(37 90% 51%)`
- **用途**: 警告訊息、重要提示、通知
- **象徵**: 注意、提醒、重要
- **CSS 變數**: `--warning`
- **工具類別**: `.bg-warning`, `.text-warning`, `.border-warning`

---

### 中性色彩

#### ⚫ 深灰（文字）

- **色碼**: `#2C3E50`
- **HSL**: `hsl(210 11% 24%)`
- **用途**: 主要文字、標題
- **CSS 變數**: `--foreground`

#### ⚪ 淺灰（背景）

- **色碼**: `#ECF0F1`
- **HSL**: `hsl(210 14% 93%)`
- **用途**: 次要背景、卡片背景
- **CSS 變數**: `--secondary`

#### ⬜ 白色

- **色碼**: `#FFFFFF`
- **HSL**: `hsl(0 0% 100%)`
- **用途**: 主背景、卡片
- **CSS 變數**: `--background`

---

## 🌗 深色模式配色

### 背景色系

- **主背景**: `hsl(210 18% 12%)` - 深藍灰
- **卡片背景**: `hsl(210 16% 16%)` - 稍亮的深藍灰
- **次要背景**: `hsl(210 15% 22%)` - 更亮的灰色

### 主要色彩（深色模式調整）

- **ReadFi Blue**: `hsl(210 85% 65%)` - 提亮 7%
- **ReadFi Orange**: `hsl(15 100% 65%)` - 提亮 5%
- **綠色**: `hsl(145 63% 55%)` - 提亮 6%
- **紫色**: `hsl(283 45% 60%)` - 提亮 7%
- **黃色**: `hsl(37 90% 55%)` - 提亮 4%

### 文字色系

- **主文字**: `hsl(0 0% 95%)` - 淺色
- **次要文字**: `hsl(210 8% 65%)` - 灰色

---

## 🎨 漸層設計

### ReadFi 品牌漸層

```css
/* 標準漸層 */
.bg-readfi-gradient {
  background: linear-gradient(
    135deg,
    hsl(210 79% 58%) 0%,
    hsl(15 100% 60%) 100%
  );
}

/* 柔和漸層（背景用）*/
.bg-readfi-gradient-soft {
  background: linear-gradient(
    135deg,
    hsl(210 79% 58% / 0.1) 0%,
    hsl(15 100% 60% / 0.1) 100%
  );
}
```

**用途**:

- Hero 區塊背景
- 特殊卡片背景
- 按鈕 hover 效果
- 裝飾性元素

---

## 📐 設計原則

### 1. 色彩層次

**主要層次**:

- Logo / 品牌識別: ReadFi Blue
- 主要按鈕 / CTA: ReadFi Blue
- 次要按鈕: 淺灰底 + ReadFi Blue 文字

**強調層次**:

- 重要 CTA: ReadFi Orange
- Hover 狀態: ReadFi Orange
- 特殊標籤: ReadFi Orange

### 2. 對比度要求

- **正常文字**: 至少 4.5:1
- **大文字（18px+）**: 至少 3:1
- **按鈕**: 至少 3:1

### 3. 無障礙設計

- 所有互動元素需有清晰的 hover / focus 狀態
- 使用顏色之外的視覺提示（圖示、文字）
- 確保深色模式下的可讀性

---

## 🎯 應用場景

### 導航欄 (Navbar)

- **背景**: 白色 / 深色模式深藍灰
- **Logo 顏色**: ReadFi Blue
- **連結**: 深灰 / 淺色
- **連結 hover**: ReadFi Blue

### 連接錢包彈窗

- **標題**: ReadFi Blue
- **按鈕背景**: ReadFi Blue
- **按鈕 hover**: ReadFi Blue (90% 透明度)
- **圖示背景**: ReadFi Orange/Blue (10% 透明度)
- **hover 圖示背景**: ReadFi Orange/Blue (20% 透明度)

### 書籍卡片

- **邊框**: 淺灰
- **hover 邊框**: ReadFi Blue
- **價格**: ReadFi Blue
- **「閱讀」按鈕**: ReadFi Blue
- **「購買」按鈕**: ReadFi Orange
- **NFT 標籤**: 紫色

### 進度條

- **背景**: 淺灰
- **填充**: ReadFi Blue → ReadFi Orange 漸層

### 通知 / Toast

- **成功**: 綠色
- **錯誤**: 紅色
- **警告**: 黃色
- **資訊**: ReadFi Blue

---

## 🛠️ 實作方式

### CSS 變數使用

```css
/* 使用主色 */
.my-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* 使用強調色 */
.my-cta {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

/* 使用成功色 */
.my-success-message {
  background-color: hsl(var(--success));
  color: hsl(var(--success-foreground));
}
```

### Tailwind 工具類別

```jsx
// 主色按鈕
<button className="bg-readfi-blue text-white hover:bg-readfi-blue/90">
  閱讀
</button>

// 強調色按鈕
<button className="bg-readfi-orange text-white hover:bg-readfi-orange/90">
  購買
</button>

// 漸層背景
<div className="bg-readfi-gradient">
  <h1 className="text-white">Welcome to ReadFi</h1>
</div>

// 柔和漸層背景
<div className="bg-readfi-gradient-soft">
  <p>Featured Content</p>
</div>
```

### 狀態顏色

```jsx
// 成功狀態
<div className="bg-success text-white">已完成</div>

// 特殊/NFT
<div className="bg-special text-white">NFT</div>

// 警告
<div className="bg-warning text-white">注意</div>
```

---

## 📊 色彩對照表

| 用途   | 淺色模式  | 深色模式  | CSS 變數       |
| ------ | --------- | --------- | -------------- |
| 主色   | `#4A90E2` | `#6CA6EC` | `--primary`    |
| 強調色 | `#FF6B35` | `#FF8A5E` | `--accent`     |
| 背景   | `#FFFFFF` | `#1A2332` | `--background` |
| 文字   | `#2C3E50` | `#F2F2F2` | `--foreground` |
| 卡片   | `#FFFFFF` | `#242F40` | `--card`       |
| 邊框   | `#E5E8EB` | `#3A4556` | `--border`     |
| 成功   | `#2ECC71` | `#3DDC84` | `--success`    |
| 特殊   | `#9B59B6` | `#B274D1` | `--special`    |
| 警示   | `#F39C12` | `#FBAD26` | `--warning`    |

---

## 🎬 動畫與過渡

### 推薦過渡時間

- **快速**: 150ms - 按鈕 hover
- **標準**: 300ms - 卡片 hover、顏色變化
- **慢速**: 500ms - 大範圍動畫

### 推薦緩動函數

- **標準**: `cubic-bezier(0.4, 0, 0.2, 1)` - Tailwind `transition-all`
- **彈性**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - 進入動畫

---

## ✅ 已實作元件

- ✅ 全域色彩系統 (`src/index.css`)
- ✅ 深色模式配色
- ✅ 連接錢包彈窗 (`ConnectWalletDialog.tsx`)
- ✅ 品牌色彩工具類別
- ⏳ Navbar（待更新）
- ⏳ BookCard（待更新）
- ⏳ Home Hero Section（待更新）

---

## 📝 設計檢查清單

使用新元件時，請確認：

- [ ] 使用 ReadFi 品牌色彩（Blue/Orange）
- [ ] 支援深色模式
- [ ] 提供清晰的 hover / focus 狀態
- [ ] 對比度符合 WCAG 標準
- [ ] 動畫流暢（150-500ms）
- [ ] 響應式設計（行動/桌面）
- [ ] 使用語意化的 CSS 變數

---

## 🔗 相關資源

- [ReadFi 視覺設計指南](https://manus.im/share/file/6fd11c0d-4d68-4a5c-86ef-1759ad42c1b1)
- [Tailwind CSS 文檔](https://tailwindcss.com)
- [WCAG 對比度檢查](https://webaim.org/resources/contrastchecker/)

---

**版本**: 1.0.0  
**最後更新**: 2025-11-01  
**維護者**: ReadFi Team
