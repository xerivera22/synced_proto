import type { PropsWithChildren } from "react";

function hasClass(prefix: string, value: string) {
  return new RegExp(`\\b${prefix}(?:-|\\[)`).test(value);
}

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const base = ["rounded-2xl", "shadow-sm"];
  if (!hasClass("bg", className)) {
    base.push("bg-white");
  }
  if (!hasClass("border", className)) {
    base.push("border", "border-slate-200");
  }

  return <div className={`${base.join(" ")} ${className}`.trim()}>{children}</div>;
}

export default Card;
