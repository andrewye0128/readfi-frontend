import { CheckCircle2, Copy } from "lucide-react";
import { formatAddress, copyToClipboard } from "@/lib/wallet";
import { toast } from "@/lib/toast";
import { Button } from "./ui/button";

interface WalletConnectedBadgeProps {
  address: string;
  onDisconnect: () => void;
}

export function WalletConnectedBadge({
  address,
  onDisconnect,
}: WalletConnectedBadgeProps) {
  const handleCopyAddress = async () => {
    const success = await copyToClipboard(address);
    if (success) {
      toast.success("地址已複製到剪貼簿");
    } else {
      toast.error("複製失敗");
    }
  };

  return (
    <div className="bg-white border-2 border-green-500/20 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">已連接地址</p>
          <div className="flex items-center gap-2 mb-3">
            <code className="text-sm font-mono text-foreground font-semibold">
              {formatAddress(address, 8, 6)}
            </code>
            <button
              onClick={handleCopyAddress}
              className="p-1 hover:bg-secondary rounded transition-colors"
              title="複製完整地址"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            className="text-xs"
          >
            取消連接
          </Button>
        </div>
      </div>
    </div>
  );
}
