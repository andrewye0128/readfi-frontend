import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";
import { Book } from "@/types";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={`/book/${book.id}`}
      onClick={handleClick}
      className="group block cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        {(book.isNew || book.isHot || book.isOwned) && (
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {book.isNew && (
              <Badge className="bg-black text-white text-xs font-medium border-0 shadow-sm">
                新書
              </Badge>
            )}
            {book.isHot && (
              <Badge className="bg-black text-white text-xs font-medium border-0 shadow-sm">
                熱門
              </Badge>
            )}
            {book.isOwned && (
              <Badge className="bg-black text-white text-xs font-medium border-0 shadow-sm">
                已擁有
              </Badge>
            )}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-medium">
            {book.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h4 className="text-foreground line-clamp-2 text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
            {book.title}
          </h4>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
              strokeWidth={2}
            />
            <span className="font-medium text-foreground">{book.rating}</span>
          </div>
          {book.readers !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" strokeWidth={2} />
              <span>{(book.readers / 1000).toFixed(1)}K</span>
            </div>
          )}
          {book.totalPages && (
            <div className="flex items-center gap-1">
              <span>{book.totalPages} 頁</span>
            </div>
          )}
        </div>

        {/* Price */}
        {book.price !== undefined && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline gap-2">
              {book.readPrice && book.readPrice < book.price && (
                <span className="text-xs text-muted-foreground line-through">
                  {book.price} READ
                </span>
              )}
              <span className="text-sm font-semibold text-foreground">
                {book.readPrice || book.price} READ
              </span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        {book.category && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground">
              {book.category}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
