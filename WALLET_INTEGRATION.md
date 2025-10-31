# ReadFi 錢包整合文檔

## 📋 功能概述

已完成的錢包連接功能包括：

### ✅ 已實作功能

1. **錢包連接對話框** (`ConnectWalletDialog`)
   - MetaMask 瀏覽器擴充連接
   - WalletConnect 支援（UI 完成，需要進一步配置）
   - 載入狀態顯示（三個點動畫）
   - 可關閉彈窗（X 按鈕）

2. **全局錢包狀態管理** (`WalletContext`)
   - 使用 React Context 管理連接狀態
   - 自動保存連接狀態到 localStorage
   - 監聽帳戶變更
   - 支援斷開連接

3. **導航欄整合** (`Navbar`)
   - 未連接時：顯示「連接錢包」按鈕
   - 已連接時：顯示用戶圖標
   - 點擊用戶圖標顯示下拉選單：
     - 顯示格式化地址
     - 複製地址功能
     - 個人資料連結（僅在連接後可用）
     - 斷開連接按鈕

4. **工具函數** (`lib/wallet.ts`)
   - `formatAddress()`: 格式化地址為 `0x1234...5678` 格式
   - `copyToClipboard()`: 複製地址到剪貼簿
   - `isValidAddress()`: 驗證以太坊地址格式

## 🔧 技術架構

### 檔案結構

```
src/
├── contexts/
│   └── WalletContext.tsx          # 錢包狀態管理
├── components/
│   ├── ConnectWalletDialog.tsx    # 連接錢包彈窗
│   ├── WalletConnectedBadge.tsx   # 已連接顯示組件
│   └── layout/
│       └── Navbar.tsx             # 導航欄（整合錢包功能）
├── lib/
│   ├── wallet.ts                  # 錢包工具函數
│   └── toast.ts                   # Toast 通知
└── App.tsx                        # 加入 WalletProvider
```

### 使用方式

#### 1. 在任何組件中使用錢包狀態

```tsx
import { useWallet } from "@/contexts/WalletContext";

function MyComponent() {
  const { address, isConnecting, connectMetaMask, disconnect } = useWallet();

  return (
    <div>
      {address ? (
        <p>已連接: {address}</p>
      ) : (
        <button onClick={connectMetaMask}>連接 MetaMask</button>
      )}
    </div>
  );
}
```

#### 2. 格式化地址顯示

```tsx
import { formatAddress } from "@/lib/wallet";

const shortAddress = formatAddress("0x1234567890123456789012345678901234567890");
// 結果: "0x1234...7890"
```

#### 3. 複製地址

```tsx
import { copyToClipboard } from "@/lib/wallet";
import { toast } from "@/lib/toast";

const handleCopy = async () => {
  const success = await copyToClipboard(address);
  if (success) {
    toast.success("地址已複製");
  }
};
```

## 🚀 使用流程

### 連接錢包流程

1. **點擊「連接錢包」按鈕**
   - 位置：導航欄右上角
   - 觸發：打開 `ConnectWalletDialog`

2. **選擇錢包類型**
   - **MetaMask**: 點擊後自動請求連接
   - **WalletConnect**: 顯示生成 QR Code（待完整實作）

3. **MetaMask 簽名流程**
   - 點擊「連接」按鈕
   - 顯示載入動畫（三個點）
   - MetaMask 彈出簽名請求
   - 用戶確認後完成連接

4. **連接成功**
   - 彈窗自動關閉
   - 顯示成功提示 Toast
   - 導航欄顯示用戶圖標
   - 地址保存到 localStorage

### 已連接狀態

連接成功後：
- 導航欄顯示用戶圖標（User icon）
- 點擊圖標顯示帳戶選單：
  - 格式化地址顯示
  - 複製地址按鈕
  - 「個人資料」連結（跳轉到 `/profile`）
  - 「斷開連接」按鈕

### 斷開連接

1. 點擊用戶圖標
2. 點擊「斷開連接」
3. 清除 localStorage
4. 顯示斷開連接提示
5. 恢復「連接錢包」按鈕

## 🎨 UI/UX 特點

### 符合 Figma 設計

1. **彈窗設計** (圖一)
   - 白色背景 + 圓角
   - MetaMask 🦊 圖標 + 「瀏覽器擴充」描述
   - WalletConnect 圖標 + 「行動錢包配對」描述
   - 右上角 X 關閉按鈕
   - 底部安全圖示和「什麼是錢包?」連結

2. **載入狀態** (圖二)
   - 三個點旋轉動畫
   - 黑色背景按鈕
   - 使用 `Loader2` 圖標

3. **已連接顯示** (圖三)
   - 顯示格式化地址 (`0x1234★★★56890`)
   - 綠色勾勾圖標表示已連接
   - 「取消連接」按鈕

### 移除的功能

- ❌ 硬體錢包選項（Ledger/Trezor）- 已按需求移除

## 📱 響應式設計

- **桌面版**: 完整顯示「連接錢包」文字
- **行動版**: 只顯示錢包圖標
- 彈窗自適應螢幕大小

## 🔒 安全性考慮

1. **連接狀態驗證**
   - 啟動時驗證 localStorage 中的地址
   - 確認地址仍在 MetaMask 連接列表中

2. **帳戶變更監聽**
   - 監聽 `accountsChanged` 事件
   - 自動更新或斷開連接

3. **錯誤處理**
   - 用戶拒絕連接（error code 4001）
   - MetaMask 未安裝
   - 網路錯誤

## 🛠️ 待完善功能

### WalletConnect 整合

目前 WalletConnect 僅有 UI，完整實作需要：

```bash
npm install @web3modal/wagmi wagmi viem @tanstack/react-query
```

```tsx
// 配置 WalletConnect
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

const projectId = 'YOUR_PROJECT_ID'
// ... 配置代碼
```

### 多鏈支援

- 支援切換網路（Ethereum, BSC, Polygon 等）
- 顯示當前連接的鏈
- 鏈切換提示

### ENS 域名支援

- 顯示 ENS 域名代替地址
- 反向解析地址到 ENS

## 📝 測試建議

### 手動測試檢查清單

- [ ] 點擊「連接錢包」打開彈窗
- [ ] 點擊 X 按鈕關閉彈窗
- [ ] 點擊背景關閉彈窗
- [ ] 連接 MetaMask 成功
- [ ] 顯示載入動畫
- [ ] 連接後顯示用戶圖標
- [ ] 點擊圖標顯示選單
- [ ] 複製地址功能正常
- [ ] 斷開連接功能正常
- [ ] 刷新頁面保持連接狀態
- [ ] 在 MetaMask 切換帳戶時自動更新
- [ ] 錯誤提示正常顯示

### 瀏覽器測試

- Chrome + MetaMask ✅
- Firefox + MetaMask ✅
- Brave + MetaMask ✅
- Edge + MetaMask ✅

## 💡 使用提示

1. **開發環境**: 確保安裝了 MetaMask 瀏覽器擴充
2. **測試網路**: 可以連接到 Sepolia/Goerli 測試網
3. **狀態持久化**: 連接狀態會保存，刷新頁面不會斷開

## 🐛 常見問題

### Q: 點擊連接沒有反應？
A: 檢查是否安裝 MetaMask，打開瀏覽器控制台查看錯誤訊息。

### Q: 連接後刷新頁面斷開了？
A: 檢查瀏覽器是否清除了 localStorage。

### Q: WalletConnect 無法使用？
A: 目前 WalletConnect 僅有 UI，需要安裝相關依賴並配置。

## 📞 技術支援

如有問題或建議，請參考：
- MetaMask 文檔: https://docs.metamask.io/
- WalletConnect 文檔: https://docs.walletconnect.com/
- Ethereum Provider API: https://eips.ethereum.org/EIPS/eip-1193

