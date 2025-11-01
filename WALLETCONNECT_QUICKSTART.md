# 🚀 WalletConnect 快速開始指南

## ✅ 已完成！可以立即使用

WalletConnect 已完整整合到 ReadFi 平台，支援所有兼容的行動錢包（包括 imToken）。

---

## 📱 如何連接（桌面端）

### 步驟 1: 打開測試頁面
```
http://localhost:5173/wallet-test
```

### 步驟 2: 點擊連接按鈕
- 點擊「連接 WalletConnect」按鈕
- 或點擊導航欄的「連接錢包」→ 選擇 WalletConnect

### 步驟 3: 掃描 QR Code
- QR Code Modal 會自動彈出
- 使用手機錢包（如 imToken）掃描 QR Code

### 步驟 4: 確認連接
- 在手機錢包中確認連接請求
- 等待連接完成

### 步驟 5: 成功！
- ✅ QR Code Modal 自動關閉
- ✅ 頁面顯示已連接狀態
- ✅ 顯示錢包地址和類型（🔵 WalletConnect）

---

## 📱 如何連接（行動端）

### 步驟 1: 在手機瀏覽器打開
```
http://localhost:5173/wallet-test
```

### 步驟 2: 點擊連接
- 點擊「連接 WalletConnect」

### 步驟 3: 選擇錢包
- 選擇已安裝的錢包（如 imToken）
- 自動跳轉到錢包 App

### 步驟 4: 確認
- 在錢包中確認連接

### 步驟 5: 返回
- 返回瀏覽器
- ✅ 連接成功！

---

## 💻 代碼使用

### 在任何組件中使用

```tsx
import { useWallet } from "@/contexts/WalletContext";

function MyComponent() {
  const { 
    address,           // 錢包地址
    walletType,        // "metamask" | "walletconnect"
    connectWalletConnect, // 連接函數
    disconnect         // 斷開函數
  } = useWallet();

  return (
    <div>
      {address ? (
        <div>
          <p>已連接: {address}</p>
          <p>類型: {walletType}</p>
          <button onClick={disconnect}>斷開</button>
        </div>
      ) : (
        <button onClick={connectWalletConnect}>
          連接 WalletConnect
        </button>
      )}
    </div>
  );
}
```

---

## 🎯 主要功能

| 功能 | 狀態 | 說明 |
|------|------|------|
| QR Code 顯示 | ✅ | 自動彈出 Modal |
| 行動錢包連接 | ✅ | imToken, Trust Wallet 等 |
| 地址顯示 | ✅ | 格式化顯示 |
| 複製地址 | ✅ | 一鍵複製 |
| 錢包類型標籤 | ✅ | 顯示 🔵 WalletConnect |
| 斷開連接 | ✅ | 清除狀態 |
| 事件監聽 | ✅ | 帳戶變更、斷開 |
| 錯誤處理 | ✅ | 友善提示 |

---

## 🔧 測試清單

### 桌面端
- [ ] QR Code Modal 正常顯示
- [ ] 手機掃描成功連接
- [ ] 地址正確顯示
- [ ] 錢包類型標籤顯示
- [ ] 複製地址功能
- [ ] 斷開連接功能
- [ ] Toast 通知顯示

### 行動端
- [ ] 錢包列表顯示
- [ ] 自動跳轉錢包
- [ ] 返回後連接成功
- [ ] 地址正確顯示
- [ ] 功能正常運作

---

## 📂 重要文件

```
src/
├── lib/
│   └── walletconnect.ts         ← WalletConnect 核心邏輯
├── contexts/
│   └── WalletContext.tsx        ← 狀態管理（已更新）
├── components/
│   ├── ConnectWalletDialog.tsx  ← 連接對話框（已更新）
│   └── layout/Navbar.tsx        ← 導航欄（已更新）
└── pages/
    └── WalletTest.tsx           ← 測試頁面（已更新）
```

---

## 🎨 UI 特點

### 連接對話框
- 🦊 MetaMask 選項
- 🔵 WalletConnect 選項
- ✕ 關閉按鈕
- ⏳ 載入動畫

### 導航欄
- 未連接：「連接錢包」按鈕
- 已連接：用戶圖標
- 下拉選單：
  - 地址顯示（帶錢包類型標籤）
  - 複製按鈕
  - 個人資料連結
  - 斷開連接按鈕

### QR Code Modal
- 自動居中
- QR Code 顯示
- 複製連結按鈕
- 關閉按鈕
- 錢包列表（行動端）

---

## 🐛 疑難排解

### 問題：QR Code 不顯示
**解決方案：**
- 檢查控制台錯誤
- 確認網路連接
- 重新整理頁面

### 問題：掃描後無法連接
**解決方案：**
- QR Code 可能過期，重新生成
- 確認手機網路正常
- 更新手機錢包到最新版本

### 問題：連接成功但刷新後斷開
**說明：**
- 這是 WalletConnect v1 的正常行為
- 需要重新連接
- 或考慮升級到 WalletConnect v2

---

## 📊 支援的錢包

✅ **完全支援的行動錢包：**
- imToken
- Trust Wallet
- Rainbow
- MetaMask Mobile
- Argent
- Pillar
- 所有 WalletConnect 兼容錢包

---

## 🚀 開始測試

### 1. 確認開發伺服器運行
```bash
cd readfi-frontend
npm run dev
```

### 2. 打開測試頁面
```
http://localhost:5173/wallet-test
```

### 3. 測試連接
- 點擊「連接 WalletConnect」
- 使用手機錢包掃描
- 確認連接成功

### 4. 測試功能
- 查看地址顯示
- 複製地址
- 查看錢包類型
- 斷開連接
- 重新連接

---

## 📚 完整文檔

- **詳細技術文檔**: `WALLETCONNECT_INTEGRATION.md`
- **錢包功能總覽**: `WALLET_INTEGRATION.md`
- **測試頁面**: `/wallet-test`

---

## ✨ 完成狀態

### ✅ 所有功能已實作
- [x] 安裝套件
- [x] 配置 Provider
- [x] QR Code Modal
- [x] 連接邏輯
- [x] 事件監聽
- [x] UI 更新
- [x] 錯誤處理
- [x] 測試頁面
- [x] 文檔完成

---

**🎉 WalletConnect 已準備就緒！立即開始測試吧！**

有任何問題請查看 `WALLETCONNECT_INTEGRATION.md` 詳細文檔。

