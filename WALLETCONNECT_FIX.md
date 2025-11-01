# 🔧 WalletConnect 錯誤修復

## 問題描述

### 問題 1: global is not defined

```
Uncaught ReferenceError: global is not defined
```

### 問題 2: Buffer externalized

```
Module "buffer" has been externalized for browser compatibility.
Cannot access "buffer.Buffer" in client code.
```

### 問題 3: Buffer is not defined

```
Uncaught ReferenceError: Buffer is not defined
```

這些都是 WalletConnect v1 的常見問題，因為它依賴 Node.js 的全局變量，但瀏覽器環境中不存在。

---

## ✅ 已修復

### 修改的文件

1. **`index.html`** - 添加 global 和 process polyfill
2. **`vite.config.ts`** - 配置 Vite 處理全局變量
3. **`src/main.tsx`** - 導入 Buffer polyfill
4. **`package.json`** - 安裝 buffer 套件

---

## 🔧 修復內容

### 1. index.html

```html
<script>
  // Polyfill for WalletConnect v1
  window.global = window;
  window.process = window.process || { env: {} };
</script>
```

### 2. vite.config.ts

```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
```

### 3. src/main.tsx

```typescript
import { Buffer } from "buffer";

// Polyfill for WalletConnect
window.Buffer = window.Buffer || Buffer;
```

### 4. package.json

```json
{
  "dependencies": {
    "buffer": "^6.0.3"
  }
}
```

---

## 🧪 測試

重新啟動開發伺服器：

```bash
# 停止當前伺服器 (Ctrl+C)
npm run dev
```

然後測試 WalletConnect：

1. 訪問 http://localhost:5173/wallet-test
2. 點擊「連接 WalletConnect」
3. 確認 QR Code Modal 正常顯示
4. 不應該再有 `global is not defined` 錯誤

---

## 📝 說明

### 為什麼需要這些 Polyfill？

WalletConnect v1 是為 Node.js 環境設計的，使用了以下全局變量：

- `global` - Node.js 的全局對象
- `process` - Node.js 的進程對象
- `Buffer` - Node.js 的 Buffer 類

瀏覽器環境中沒有這些變量，所以需要 polyfill：

- `global` → `window` 或 `globalThis`
- `process` → `{ env: {} }`
- `Buffer` → 從 `buffer` 套件導入

### Vite 配置的作用

1. **define**: 在構建時替換代碼中的變量
2. **resolve.alias**: 設置模組別名
3. **optimizeDeps**: 優化依賴項的構建

---

## 🔄 未來改進

### 升級到 WalletConnect v2

WalletConnect v2 對瀏覽器環境有更好的支援，不需要這些 polyfill。

安裝步驟：

```bash
npm install @web3modal/wagmi wagmi viem @tanstack/react-query
```

優點：

- ✅ 不需要 polyfill
- ✅ 更快的連接速度
- ✅ 更好的持久化
- ✅ 改進的 QR Code 顯示
- ✅ 更小的 bundle 大小

---

## ⚠️ 注意事項

### 開發環境

- 修改配置後需要重啟開發伺服器
- 清除瀏覽器緩存可能有幫助

### 生產環境

- 這些 polyfill 會增加 bundle 大小（約 50KB）
- 考慮升級到 WalletConnect v2 以獲得更好的性能

### 安全性

- 這些 polyfill 只是為了兼容性
- 不會影響安全性
- 所有錢包連接仍然安全

---

## 🐛 如果仍有問題

### 1. 清除緩存

```bash
# 清除 Vite 緩存
rm -rf node_modules/.vite
```

### 2. 重新安裝依賴

```bash
rm -rf node_modules
npm install
```

### 3. 檢查瀏覽器控制台

查看是否有其他錯誤訊息

### 4. 確認套件版本

```bash
npm list buffer
npm list @walletconnect/web3-provider
```

---

## 📚 相關資源

- [Vite 文檔 - 環境變量](https://vitejs.dev/config/shared-options.html#define)
- [Buffer Polyfill](https://github.com/feross/buffer)
- [WalletConnect v1 文檔](https://docs.walletconnect.com/1.0/)
- [WalletConnect v2 升級指南](https://docs.walletconnect.com/2.0/advanced/migration-from-v1.x)

---

## ✅ 檢查清單

修復完成後，確認以下項目：

- [ ] 沒有 `global is not defined` 錯誤
- [ ] 沒有 `process is not defined` 錯誤
- [ ] 沒有 `Buffer is not defined` 錯誤
- [ ] QR Code Modal 正常顯示
- [ ] WalletConnect 連接成功
- [ ] 掃描 QR Code 可以連接
- [ ] 斷開連接功能正常
- [ ] 開發伺服器運行正常

---

**✅ 錯誤已修復！WalletConnect 現在應該可以正常運作了。**

如果遇到其他問題，請檢查瀏覽器控制台的錯誤訊息。
