import type { ReactNode } from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  className?: string;
}

export function Banner({ title, subtitle, right, className = "" }: BannerProps) {
  return (
    <div
      className={`bg-gradient-to-br from-[#647FBC] to-[#5a73b3] text-white h-20 md:h-24 rounded-[12px] shadow-sm ${className}`}
    >
      <div className="h-full flex items-center justify-between px-3 md:px-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-base md:text-lg font-semibold leading-snug">{title}</h1>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}

export default Banner;
