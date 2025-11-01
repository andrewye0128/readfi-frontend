import { useState } from "react";
import { X, Loader2, Shield, CheckCircle2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/lib/toast";

interface ConnectWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectWalletDialog({
  open,
  onClose,
}: ConnectWalletDialogProps) {
  const {
    connectMetaMask,
    connectImToken,
    connectWalletConnect,
    isConnecting,
  } = useWallet();
  const [loadingWallet, setLoadingWallet] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!open) return null;

  const handleMetaMaskConnect = async () => {
    setLoadingWallet("metamask");
    await connectMetaMask();
    setLoadingWallet(null);
    onClose();
  };

  const handleImTokenConnect = async () => {
    setLoadingWallet("imtoken");
    await connectImToken();
    setLoadingWallet(null);
    onClose();
  };

  const handleWalletConnectConnect = async () => {
    setLoadingWallet("walletconnect");
    await connectWalletConnect();
    setLoadingWallet(null);
    onClose();
  };

  const handleAuthorizeCathay = () => {
    setShowAuthDialog(true);
  };

  const handleSignMessage = async () => {
    setIsAuthorizing(true);

    try {
      if (!window.ethereum) {
        toast.error("請先連接錢包");
        return;
      }

      const message = `授權國泰金控 ReadFi 平台使用您的錢包資訊\n\n時間戳: ${new Date().toISOString()}\n平台: ReadFi\n授權對象: 國泰金控`;

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      });

      console.log("簽名成功:", signature);
      setAuthSuccess(true);
      toast.success("授權成功！");

      setTimeout(() => {
        setShowAuthDialog(false);
        setAuthSuccess(false);
        setIsAuthorizing(false);
      }, 2000);
    } catch (error: any) {
      console.error("簽名失敗:", error);
      if (error.code === 4001) {
        toast.error("用戶拒絕簽名");
      } else {
        toast.error("簽名失敗，請重試");
      }
      setIsAuthorizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-readfi-blue">連接你的錢包</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3">
          {/* MetaMask */}
          <button
            onClick={handleMetaMaskConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-background border-2 border-border rounded-xl hover:border-readfi-blue hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-readfi-orange/10 flex items-center justify-center group-hover:bg-readfi-orange/20 transition-colors">
                <span className="text-2xl">🦊</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">MetaMask</p>
                <p className="text-sm text-muted-foreground">瀏覽器擴充</p>
              </div>
            </div>
            {loadingWallet === "metamask" ? (
              <div className="flex items-center justify-center w-20 h-10 bg-readfi-blue rounded-lg">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            ) : (
              <div className="px-4 py-2 bg-readfi-blue hover:bg-readfi-blue/90 text-white rounded-lg text-sm font-medium transition-colors">
                連接
              </div>
            )}
          </button>

          {/* imToken */}
          <button
            onClick={handleImTokenConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-background border-2 border-border rounded-xl hover:border-readfi-blue hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-readfi-blue/10 flex items-center justify-center group-hover:bg-readfi-blue/20 transition-colors">
                <span className="text-2xl">💎</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">imToken</p>
                <p className="text-sm text-muted-foreground">App 內瀏覽器 / WalletConnect</p>
              </div>
            </div>
            {loadingWallet === "imtoken" ? (
              <div className="flex items-center justify-center w-20 h-10 bg-readfi-blue rounded-lg">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            ) : (
              <div className="px-4 py-2 bg-readfi-blue hover:bg-readfi-blue/90 text-white rounded-lg text-sm font-medium transition-colors">
                連接
              </div>
            )}
          </button>

          {/* WalletConnect */}
          <button
            onClick={handleWalletConnectConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-background border-2 border-border rounded-xl hover:border-readfi-blue hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-readfi-blue/10 flex items-center justify-center group-hover:bg-readfi-blue/20 transition-colors">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.19 14.77a13.95 13.95 0 0 1 23.62 0l.78.94a.5.5 0 0 1-.08.7l-2.67 2.23a.25.25 0 0 1-.35-.03l-1.08-1.27a9.73 9.73 0 0 0-16.47 0l-1.15 1.36a.25.25 0 0 1-.35.03l-2.67-2.23a.5.5 0 0 1-.08-.7l.78-.94-.28-.09zm29.17 4.61 2.37 1.98a.5.5 0 0 1 .08.7l-10.7 12.6a.5.5 0 0 1-.7.07l-7.6-6.33a.13.13 0 0 0-.17 0l-7.6 6.33a.5.5 0 0 1-.7-.07L1.64 21.06a.5.5 0 0 1 .08-.7l2.37-1.98a.5.5 0 0 1 .65.03l7.6 6.33a.13.13 0 0 0 .17 0l7.6-6.33a.5.5 0 0 1 .65-.03z"
                    fill="hsl(var(--primary))"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">WalletConnect</p>
                <p className="text-sm text-muted-foreground">imToken、Trust、Rainbow 等</p>
              </div>
            </div>
            {loadingWallet === "walletconnect" ? (
              <div className="flex items-center justify-center w-20 h-10 bg-readfi-blue rounded-lg">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            ) : (
              <div className="px-4 py-2 bg-readfi-blue hover:bg-readfi-blue/90 text-white rounded-lg text-sm font-medium transition-colors">
                掃描
              </div>
            )}
          </button>
        </div>

        {/* 國泰金控授權按鈕 */}
        <div className="mt-6 pt-6 border-t border-border">
          <button
            onClick={handleAuthorizeCathay}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">國泰金控授權</p>
                <p className="text-sm text-muted-foreground">驗證您的身份</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
              授權
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <button className="w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {/* 桌面請用 WalletConnect */}
            什麼是錢包?
          </button>
        </div>
      </div>

      {/* 國泰金控授權簽名彈窗 */}
      {showAuthDialog && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => !isAuthorizing && setShowAuthDialog(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6 border border-border">
            {/* Close button */}
            {!isAuthorizing && (
              <button
                onClick={() => setShowAuthDialog(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}

            {authSuccess ? (
              /* 授權成功 */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  授權成功！
                </h3>
                <p className="text-sm text-muted-foreground">
                  您已成功授權給國泰金控
                </p>
              </div>
            ) : (
              /* 簽名驗證 */
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    國泰金控身份驗證
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    請簽署訊息以授權國泰金控使用您的錢包資訊
                  </p>
                </div>

                {/* 授權內容 */}
                <div className="bg-secondary rounded-lg p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">平台:</span>
                    <span className="font-medium text-foreground">ReadFi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">授權對象:</span>
                    <span className="font-medium text-foreground">
                      國泰金控
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">有效期:</span>
                    <span className="font-medium text-foreground">永久</span>
                  </div>
                </div>

                {/* 注意事項 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-yellow-800">
                    ⚠️ 此簽名不會執行任何交易，僅用於身份驗證
                  </p>
                </div>

                {/* 簽名按鈕 */}
                <button
                  onClick={handleSignMessage}
                  disabled={isAuthorizing}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAuthorizing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      簽署中...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      確認簽署
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
