import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-card dark:bg-card rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 border border-border">
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
                <p className="text-sm text-muted-foreground">行動錢包</p>
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
                <p className="text-sm text-muted-foreground">掃描 QR Code</p>
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
            什麼是錢包?
          </button>
        </div>
      </div>
    </div>
  );
}
