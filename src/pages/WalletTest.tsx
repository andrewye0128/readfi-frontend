import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { ConnectWalletDialog } from "@/components/ConnectWalletDialog";
import { WalletConnectedBadge } from "@/components/WalletConnectedBadge";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/wallet";
import { Wallet, CheckCircle2, XCircle } from "lucide-react";

export default function WalletTest() {
  const {
    address,
    walletType,
    isConnecting,
    connectMetaMask,
    connectImToken,
    connectWalletConnect,
    disconnect,
  } = useWallet();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">錢包連接測試</h1>
          <p className="text-muted-foreground text-lg">
            測試 ReadFi 平台的錢包整合功能
          </p>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>連接狀態</span>
              {address ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground" />
              )}
            </h2>

            {address ? (
              <WalletConnectedBadge
                address={address}
                onDisconnect={disconnect}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">目前尚未連接錢包</p>
                <Button onClick={() => setShowDialog(true)} size="lg">
                  <Wallet className="w-4 h-4 mr-2" />
                  連接錢包
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Feature List */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-3 text-lg">✅ 已完成功能</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>MetaMask 瀏覽器擴充連接</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>imToken 行動錢包連接</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>WalletConnect QR Code 連接</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>載入狀態動畫（三個點）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>地址格式化顯示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>複製地址到剪貼簿</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>斷開連接功能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>狀態持久化（localStorage）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>帳戶變更監聽</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-3 text-lg">🎨 UI/UX 特點</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>符合 Figma 設計的彈窗</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>可關閉的對話框（X 按鈕）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>已移除硬體錢包選項</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>連接後顯示用戶圖標</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>下拉選單顯示帳戶資訊</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>響應式設計（桌面/行動版）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Toast 通知提示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>錯誤處理與提示</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Connection Info */}
        {address && (
          <div className="bg-secondary border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-lg">連接資訊</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">完整地址:</span>
                <code className="text-foreground">{address}</code>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">短格式:</span>
                <code className="text-foreground">
                  {formatAddress(address)}
                </code>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">連接方式:</span>
                <span className="text-foreground">
                  {walletType === "metamask"
                    ? "🦊 MetaMask"
                    : walletType === "imtoken"
                    ? "💎 imToken"
                    : walletType === "walletconnect"
                    ? "🔵 WalletConnect"
                    : "未知"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Test Actions */}
        <div className="mt-8 p-6 bg-muted/50 rounded-xl">
          <h3 className="font-semibold mb-3">測試動作</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowDialog(true)}
              variant="outline"
              disabled={isConnecting}
            >
              打開連接對話框
            </Button>
            <Button
              onClick={connectMetaMask}
              variant="outline"
              disabled={isConnecting}
            >
              連接 MetaMask
            </Button>
            <Button
              onClick={connectImToken}
              variant="outline"
              disabled={isConnecting}
            >
              連接 imToken
            </Button>
            <Button
              onClick={connectWalletConnect}
              variant="outline"
              disabled={isConnecting}
            >
              連接 WalletConnect
            </Button>
            {address && (
              <Button onClick={disconnect} variant="outline">
                斷開連接
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConnectWalletDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Layout>
  );
}
