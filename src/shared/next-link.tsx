import * as React from "react";

// Reemplazo de next/link: los bloques de registros asumen Next.js
const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: any; prefetch?: boolean; scroll?: boolean; replace?: boolean }>(
  ({ href, prefetch, scroll, replace, ...props }, ref) => (
    <a ref={ref} href={typeof href === "string" ? href : href?.pathname ?? "#"} {...props} />
  ),
);
export default Link;
