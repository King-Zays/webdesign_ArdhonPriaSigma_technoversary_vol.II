"use client";

import { useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

export interface LinearRuleTopic {
  id: string;
  label: string;
  summary: string;
}

interface LinearRuleColumnsProps {
  leftColumn: ReactNode;
  col1: LinearRuleTopic[];
  col2: LinearRuleTopic[];
  defaultOpenId?: string | null;
}

/**
 * Shared 3-column Linear-style metadata and expandable rule strip used
 * underneath edukasi visual stages.
 */
export default function LinearRuleColumns({
  leftColumn,
  col1,
  col2,
  defaultOpenId = null,
}: LinearRuleColumnsProps) {
  const [openTopicId, setOpenTopicId] = useState<string | null>(defaultOpenId);

  const toggleTopic = (id: string) => {
    setOpenTopicId((prev) => (prev === id ? null : id));
  };

  const renderColumn = (topics: LinearRuleTopic[]) => (
    <div className="space-y-3">
      {topics.map((topic) => {
        const isOpen = openTopicId === topic.id;
        return (
          <div key={topic.id}>
            <button
              type="button"
              onClick={() => toggleTopic(topic.id)}
              aria-expanded={isOpen}
              className="group flex items-center gap-2 text-left text-[13px] font-semibold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              <span>{topic.label}</span>
              {isOpen ? (
                <Minus size={13} className="shrink-0 text-[#426352]" aria-hidden="true" />
              ) : (
                <Plus size={13} className="shrink-0 text-[#426352]" aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <p className="mt-1.5 text-xs leading-relaxed text-[#426352]">
                {topic.summary}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 border-t border-emerald-950/[0.06] pt-8 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">{leftColumn}</div>
      <div className="md:col-span-4">{renderColumn(col1)}</div>
      <div className="md:col-span-4">{renderColumn(col2)}</div>
    </div>
  );
}
