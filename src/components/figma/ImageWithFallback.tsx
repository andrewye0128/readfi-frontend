import * as React from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
  ...props
}: ImageWithFallbackProps) {
  const [imgError, setImgError] = React.useState(false);

  if (imgError || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-secondary text-muted-foreground",
          className
        )}
      >
        {fallback || <BookOpen className="h-12 w-12 opacity-50" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
      {...props}
    />
  );
}
