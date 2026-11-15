import type { ReactNode } from "react";
import LayoutWrapper from "./LayoutWrapper";

export default function PublicContentPage({
  title,
  description,
  intro,
  children,
}: {
  title: string;
  description: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <LayoutWrapper>
      {intro ?? <div className="border-b border-emerald-100 bg-[#FAFDFB]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#3B5B49]">{description}</p>
        </div>
      </div>}
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </div>
    </LayoutWrapper>
  );
}
