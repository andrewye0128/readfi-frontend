import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, User, Copy, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { ConnectWalletDialog } from "@/components/ConnectWalletDialog";
import { formatAddress, copyToClipboard } from "@/lib/wallet";
import { toast } from "@/lib/toast";

export default function Navbar() {
  const { address, disconnect } = useWallet();
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      const success = await copyToClipboard(address);
      if (success) {
        toast.success("地址已複製");
      } else {
        toast.error("複製失敗");
      }
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ReadFi</span>
            </Link>

            <div className="flex items-center gap-2">
              {address ? (
                /* 已連接錢包 - 顯示用戶資訊 */
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                  >
                    <User className="h-5 w-5" />
                  </Button>

                  {/* 帳戶下拉選單 */}
                  {showAccountMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowAccountMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                        {/* 地址資訊 */}
                        <div className="p-4 bg-secondary border-b border-border">
                          <p className="text-xs text-muted-foreground mb-1">
                            已連接地址
                          </p>
                          <div className="flex items-center justify-between">
                            <code className="text-sm font-mono text-foreground">
                              {formatAddress(address)}
                            </code>
                            <button
                              onClick={handleCopyAddress}
                              className="p-1.5 hover:bg-white rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>

                        {/* 選單項目 */}
                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowAccountMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors"
                          >
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              個人資料
                            </span>
                          </Link>
                          <button
                            onClick={() => {
                              disconnect();
                              setShowAccountMenu(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors w-full text-left"
                          >
                            <LogOut className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              斷開連接
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* 未連接錢包 - 顯示連接按鈕 */
                <Button
                  variant="outline"
                  onClick={() => setShowWalletDialog(true)}
                  className="gap-2"
                >
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline">連接錢包</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 錢包連接彈窗 */}
      <ConnectWalletDialog
        open={showWalletDialog}
        onClose={() => setShowWalletDialog(false)}
      />
    </>
  );
}
