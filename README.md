# 📚 ReadFi — Redefining Ownership in Digital Reading  

[![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb.svg?style=flat&logo=react)](https://react.dev/)  
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)  
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind%20CSS-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)  
[![Wallet](https://img.shields.io/badge/Wallet-imToken-blue.svg?style=flat&logo=ethereum)](https://token.im/)  
[![Contract](https://img.shields.io/badge/Contract-ERC20%20%2B%20ERC1155-green.svg)](https://ethereum.org/en/developers/docs/standards/tokens/)  
[![Network](https://img.shields.io/badge/Network-Zircuit%20Garfield%20Testnet-orange.svg)](https://zircuit.com/)  

---

![ReadFi Banner](https://github.com/andrewye0128/readfi-frontend/blob/main/src/assets/readfi-banner.png?raw=true) 
> *“Books should belong to readers — not platforms.”*  
> ReadFi 讓閱讀不只是知識，而是可收藏、可支付、可增值的數位資產。  

---

🔗 **Demo 網址：** [https://andrewye0128.github.io/readfi-frontend](https://andrewye0128.github.io/readfi-frontend)  
---
---

## 🌍 Vision & Overview  

> **“Books should belong to readers — not platforms.”**

ReadFi 是一個以 **區塊鏈技術重新定義電子書所有權** 的 Web3 閱讀平台。  
每一本電子書都會被鑄造成 NFT，使用者透過錢包登入後，即可購買、典藏、轉售與參與出版 DAO 治理。  

💡 **核心理念：**  
讓閱讀不只是知識的累積，而是一種可收藏、可支付、可增值的數位資產體驗。  

---

## 🧩 Problem & Opportunity  

### 傳統電子書的侷限  
- ❌封閉平台：Kindle、Kobo、Google Books 無法互通  
- ❌假性擁有權：購買僅為授權而非真正擁有  
- ❌高抽成壟斷：平台抽取 30~50% 收益  
- ❌無法流通：書籍無法轉售或收藏  

### 市場機會  
- 全球電子書市場將於 **2028 年突破 200 億美元**  
- Web3 正在引領「內容資產化」革命  
- 去中心化閱讀市場為 **新興藍海**

---

## 💡 Solution  

**ReadFi — Decentralized Reading Economy**

| 功能 | 說明 |
|------|------|
| 📚 NFT 電子書 | 每本書皆為 ERC-1155 NFT，代表真實擁有權 |
| 🔐 錢包登入 | 支援 MetaMask / imToken / WalletConnect |
| 💎 智能分潤 | 自動分配收益給作者與出版社 |
| ⛓️ Read-to-Earn | 閱讀時間可兌換 Token 獎勵 |
| 🗳️ DAO 出版治理 | 社群投票決定出版新書與分潤比例 |

---

## ⚙️ Technical Architecture  

**🧱 系統層級：**

### Blockchain Layer  
- Polygon / Arbitrum (L2)  
- ERC-20 (READ) + ERC-1155 (Books NFT)  
- 驗證所有權、分潤、治理投票  

### Storage Layer  
- IPFS / Arweave  
- 書籍加密儲存（AES 密鑰綁定錢包地址）  

### Application Layer  
- 🧠 **Frontend：React + TypeScript + Tailwind CSS**  
  - 使用 React Hooks 與 Context API 架構  
  - 以 Tailwind CSS 建立響應式 UI 與 Web3 互動動效  
- ⚙️ **Backend：Node.js / Express API**  
  - 提供書籍上傳、NFT 鑄造與交易查詢 API  
- 💳 **Wallet Integration：**  
  - 支援 MetaMask / imToken / WalletConnect  

### Security Layer  
- 智能合約多簽管理  
- 錢包私鑰簽章驗證  
- 雜湊檢查內容真實性  

---

## 🔗 imToken Integration Task  

### 💡 主題  
**錢包進化：讓實體資產走入鏈上與日常支付體驗**

### ✅ 串接成果  
- 支援 **imToken 錢包登入與授權簽章**  
- 匯入 **Zircuit Garfield Testnet RPC Endpoint**  
- 顯示 **READ Token（10,000,000 枚）**  
- 錢包可檢視 Token 餘額與交易紀錄  
- 未來計畫支援 **imKey 硬體錢包整合**，提升安全性  

### 🚀 任務意義  
- 實現「閱讀即支付」與「書籍即資產」的 RWA 目標  
- 將文化內容納入錢包生態，讓閱讀成為日常加密互動
---
