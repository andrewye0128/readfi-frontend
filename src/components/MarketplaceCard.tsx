import { TrendingDown, User, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "@/lib/toast";

interface MarketplaceCardProps {
  book: {
    title: string;
    author: string;
    cover: string;
    originalPrice: number;
    currentPrice: number;
    seller: string;
    nftId: string;
    royalty: number;
    listed: string;
    previousOwners: number;
  };
}

export default function MarketplaceCard({ book }: MarketplaceCardProps) {
  const discount = (
    ((book.originalPrice - book.currentPrice) / book.originalPrice) *
    100
  ).toFixed(0);

  const handlePurchase = () => {
    toast.success(`已購買《${book.title}》，共 ${book.currentPrice} READ`);
  };

  const handleMakeOffer = () => {
    toast.info(`準備對《${book.title}》出價`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border hover:border-readfi-blue transition-all group hover:shadow-md">
      <div className="relative aspect-2/3 overflow-hidden bg-secondary">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <Badge className="absolute top-2 right-2 bg-special text-white border-0 text-xs shadow-sm">
          {book.nftId}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h4 className="text-foreground line-clamp-2 text-sm font-semibold leading-tight group-hover:text-readfi-blue transition-colors">
            {book.title}
          </h4>
          <p className="text-muted-foreground text-xs">{book.author}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-xl font-bold text-readfi-blue">
            {book.currentPrice}
          </span>
          <span className="text-muted-foreground text-sm">READ</span>
          {book.originalPrice > book.currentPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {book.originalPrice}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" strokeWidth={2} />
              <span>賣家</span>
            </div>
            <code className="bg-secondary px-2 py-0.5 rounded text-xs font-mono border border-border text-foreground">
              {book.seller}
            </code>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" strokeWidth={2} />
              <span>上架</span>
            </div>
            <span>{book.listed}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3" strokeWidth={2} />
              <span>持有人數</span>
            </div>
            <span>{book.previousOwners}</span>
          </div>
        </div>

        {/* Royalty Info */}
        <div className="bg-secondary rounded-lg p-3 text-xs border border-border">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-medium">作者版稅</span>
            <span className="font-semibold">
              {book.royalty}% (
              {((book.currentPrice * book.royalty) / 100).toFixed(1)} READ)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handlePurchase}
            className="flex-1 bg-readfi-orange hover:bg-readfi-orange/90 text-white text-sm"
          >
            立即購買
          </Button>
          <Button
            onClick={handleMakeOffer}
            variant="outline"
            className="flex-1 text-sm hover:border-readfi-blue hover:text-readfi-blue"
          >
            出價
          </Button>
        </div>
      </div>
    </div>
  );
}
