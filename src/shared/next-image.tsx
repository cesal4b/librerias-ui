import * as React from "react";

// Reemplazo de next/image
export default function Image({ src, alt, fill, priority, quality, placeholder, blurDataURL, unoptimized, loader, style, ...props }: any) {
  const s = typeof src === "string" ? src : src?.src;
  const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : {};
  return <img src={s} alt={alt} loading={priority ? "eager" : "lazy"} style={{ ...fillStyle, ...style }} {...props} />;
}
