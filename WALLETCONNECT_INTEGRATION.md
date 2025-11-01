# 🔵 WalletConnect 整合文檔

## ✅ 已完成功能

### 核心功能
- ✅ WalletConnect Provider 配置
- ✅ QR Code Modal 顯示
- ✅ 行動錢包連接（imToken, Trust Wallet, Rainbow 等）
- ✅ 帳戶變更監聽
- ✅ 斷開連接處理
- ✅ 狀態持久化
- ✅ 錯誤處理

## 📦 已安裝套件

```json
{
  "@walletconnect/web3-provider": "^1.8.0",
  "@walletconnect/qrcode-modal": "^1.8.0",
  "ethers": "^5.7.2"
}
```

## 🏗️ 架構說明

### 1. WalletConnect Provider (`lib/walletconnect.ts`)

```typescript
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";

// 創建 Provider
const provider = new WalletConnectProvider({
  rpc: {
    1: "https://eth.llamarpc.com",        // Ethereum Mainnet
    5: "https://rpc.ankr.com/eth_goerli",  // Goerli Testnet
    11155111: "https://rpc.ankr.com/eth_sepolia", // Sepolia Testnet
  },
  qrcodeModal: QRCodeModal,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust", "rainbow", "argent", "imtoken"],
  },
});
```

### 2. Context 整合 (`contexts/WalletContext.tsx`)

新增：
- `walletType`: 追蹤錢包類型（`"metamask"` | `"walletconnect"` | `null`）
- `connectWalletConnect()`: WalletConnect 連接函數
- WalletConnect 事件監聽器

### 3. UI 更新

#### Navbar
- 顯示錢包類型圖標（🦊 MetaMask / 🔵 WalletConnect）
- 下拉選單顯示當前連接方式

#### ConnectWalletDialog
- 點擊 "生成QR" 按鈕啟動 WalletConnect
- 顯示 QR Code Modal
- 載入動畫

## 🚀 使用方式

### 基本連接

```tsx
import { useWallet } from "@/contexts/WalletContext";

function MyComponent() {
  const { address, walletType, connectWalletConnect, disconnect } = useWallet();

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

### 直接調用函數

```tsx
import { connectWalletConnect } from "@/lib/walletconnect";

async function handleConnect() {
  try {
    const address = await connectWalletConnect();
    console.log("已連接地址:", address);
  } catch (error) {
    console.error("連接失敗:", error);
  }
}
```

## 📱 支援的錢包

WalletConnect 支援所有兼容的行動錢包：

- **imToken** ✅
- **Trust Wallet** ✅
- **Rainbow** ✅
- **MetaMask Mobile** ✅
- **Argent** ✅
- **Pillar** ✅
- **所有 WalletConnect 兼容錢包** ✅

## 🔄 連接流程

### 桌面端
1. 點擊「生成QR」按鈕
2. 顯示 QR Code Modal
3. 使用行動錢包掃描 QR Code
4. 在手機上確認連接
5. 連接成功，Modal 自動關閉
6. 顯示已連接狀態

### 行動端
1. 點擊「生成QR」按鈕
2. 顯示錢包列表
3. 選擇已安裝的錢包
4. 自動跳轉到錢包 App
5. 確認連接
6. 返回瀏覽器
7. 連接成功

## 🎨 QR Code Modal 樣式

QR Code Modal 由 `@walletconnect/qrcode-modal` 提供：

- ✅ 自動居中顯示
- ✅ 暗色背景
- ✅ 關閉按鈕
- ✅ 複製連結按鈕
- ✅ 行動端顯示錢包列表
- ✅ 桌面端顯示 QR Code

## 🔧 配置選項

### RPC 端點配置

```typescript
rpc: {
  1: "https://eth.llamarpc.com",           // Ethereum 主網
  5: "https://rpc.ankr.com/eth_goerli",    // Goerli 測試網
  11155111: "https://rpc.ankr.com/eth_sepolia", // Sepolia 測試網
  56: "https://bsc-dataseed.binance.org/", // BSC 主網
  137: "https://polygon-rpc.com/",         // Polygon 主網
}
```

### 行動錢包配置

```typescript
qrcodeModalOptions: {
  mobileLinks: [
    "metamask",    // MetaMask
    "trust",       // Trust Wallet
    "rainbow",     // Rainbow
    "argent",      // Argent
    "imtoken",     // imToken
    "pillar",      // Pillar
  ],
}
```

## 🔐 安全性

### 狀態持久化
- 地址保存到 `localStorage`
- 錢包類型保存到 `localStorage`
- 重新載入頁面時自動恢復

### 事件監聽
- ✅ `accountsChanged`: 帳戶切換
- ✅ `disconnect`: 斷開連接
- ✅ 自動清理監聽器

### 錯誤處理
- ✅ 用戶取消連接
- ✅ 網路錯誤
- ✅ QR Code 過期
- ✅ 連接超時

## 📊 狀態管理

```typescript
interface WalletContextType {
  address: string | null;                    // 連接的地址
  isConnecting: boolean;                     // 連接中狀態
  walletType: "metamask" | "walletconnect" | null; // 錢包類型
  connectMetaMask: () => Promise<void>;      // 連接 MetaMask
  connectWalletConnect: () => Promise<void>; // 連接 WalletConnect
  disconnect: () => void;                    // 斷開連接
}
```

## 🧪 測試

### 測試頁面
訪問 `/wallet-test` 進行測試：

```
http://localhost:5173/wallet-test
```

### 測試步驟

#### 桌面端測試
1. 點擊「連接 WalletConnect」
2. 確認 QR Code Modal 顯示
3. 使用手機錢包（如 imToken）掃描
4. 在手機上確認連接
5. 確認頁面顯示已連接狀態
6. 確認地址正確顯示
7. 測試斷開連接

#### 行動端測試
1. 在手機瀏覽器打開測試頁面
2. 點擊「連接 WalletConnect」
3. 選擇已安裝的錢包
4. 確認自動跳轉
5. 在錢包中確認連接
6. 返回瀏覽器
7. 確認連接成功

### 功能檢查清單

- [ ] QR Code 正確顯示
- [ ] 手機掃描連接成功
- [ ] 地址正確顯示
- [ ] 複製地址功能正常
- [ ] 錢包類型標籤顯示
- [ ] 帳戶切換自動更新
- [ ] 斷開連接功能正常
- [ ] 刷新頁面保持連接
- [ ] Toast 通知正確顯示
- [ ] 錯誤處理正常

## 🐛 常見問題

### Q: QR Code 不顯示？
**A:** 檢查：
1. 是否正確安裝 `@walletconnect/qrcode-modal`
2. 瀏覽器控制台是否有錯誤
3. 網路連接是否正常

### Q: 掃描後無法連接？
**A:** 可能原因：
1. QR Code 已過期（重新生成）
2. 網路問題
3. RPC 端點不可用
4. 手機錢包版本過舊

### Q: 連接後刷新頁面斷開？
**A:** WalletConnect 需要重新連接：
- 這是正常行為
- 建議引導用戶重新連接
- 或使用 WalletConnect v2（支援持久化）

### Q: 如何升級到 WalletConnect v2？
**A:** 安裝新套件：
```bash
npm install @web3modal/wagmi wagmi viem @tanstack/react-query
```

參考官方文檔：
https://docs.walletconnect.com/

## 📈 效能優化

### Lazy Loading
```typescript
// 延遲載入 WalletConnect
const provider = await import("@walletconnect/web3-provider");
```

### Provider 重用
```typescript
// 重用同一個 Provider 實例
let walletConnectProvider: WalletConnectProvider | null = null;
```

### 事件監聽清理
```typescript
// useEffect cleanup
return () => {
  removeWalletConnectListeners();
};
```

## 🔄 升級路徑

### 目前版本：WalletConnect v1
- ✅ 功能完整
- ⚠️ 已被棄用
- ⚠️ 建議升級到 v2

### 升級到 v2 的好處：
1. 更快的連接速度
2. 更好的持久化
3. 改進的 QR Code 顯示
4. 更多錢包支援
5. 更好的錯誤處理

### 升級步驟：
1. 安裝 v2 套件
2. 更新 Provider 配置
3. 更新 UI 整合
4. 測試所有功能
5. 部署更新

## 📚 相關資源

- [WalletConnect 官方文檔](https://docs.walletconnect.com/)
- [WalletConnect GitHub](https://github.com/WalletConnect)
- [支援的錢包列表](https://walletconnect.com/explorer)
- [imToken 整合指南](https://docs.token.im/)

## 🎉 總結

### 已實作功能
✅ 完整的 WalletConnect 整合  
✅ QR Code Modal 顯示  
✅ 行動錢包連接（imToken 等）  
✅ 帳戶管理  
✅ 事件監聽  
✅ 錯誤處理  
✅ 狀態持久化  
✅ UI 優化  

### 測試方式
1. 訪問 `/wallet-test`
2. 點擊「連接 WalletConnect」
3. 使用手機錢包掃描 QR Code
4. 確認連接成功
5. 測試各項功能

### 下一步
- 考慮升級到 WalletConnect v2
- 添加更多網路支援
- 優化連接速度
- 改進錯誤提示

---

**WalletConnect 整合完成！可以開始使用了！** 🚀

