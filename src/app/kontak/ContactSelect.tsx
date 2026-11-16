"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface ContactSelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface ContactSelectProps<T extends string> {
  id: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly ContactSelectOption<T>[];
  placeholder?: string;
  required?: boolean;
  labelId?: string;
}

export default function ContactSelect<T extends string>({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Pilih opsi",
  required = false,
  labelId,
}: ContactSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() =>
    Math.max(
      0,
      options.findIndex((opt) => opt.value === value),
    ),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);
  const SelectedIcon = selectedOption?.icon;

  useEffect(() => {
    if (!open) return;

    function handleOutsidePointer(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
    };
  }, [open]);

  function openMenu() {
    const currentIdx = options.findIndex((opt) => opt.value === value);
    setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    setOpen(true);
  }

  function selectOption(option: ContactSelectOption<T>) {
    onChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length,
        );
      }
    } else if (event.key === "Home" && open) {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End" && open) {
      event.preventDefault();
      setHighlightedIndex(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        const chosen = options[highlightedIndex];
        if (chosen) selectOption(chosen);
      }
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab" && open) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${open ? "z-40" : "z-10"}`}
    >
      {/* Hidden input keeps native form submission and required validation */}
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />

      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={labelId ? `${labelId} ${id}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`group flex w-full items-center justify-between gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all duration-200 focus-visible:outline-none ${
          open
            ? "border-[#1D9E75] bg-white shadow-[0_0_0_3px_rgba(29,158,117,0.14)]"
            : "border-emerald-900/15 bg-[#FAFDFB] hover:border-emerald-900/25 hover:bg-white focus-visible:border-[#1D9E75] focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgba(29,158,117,0.12)]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {SelectedIcon && (
            <span
              aria-hidden="true"
              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
                open
                  ? "bg-[#E6F7EE] text-[#0F3D2E]"
                  : "bg-[#EEF7F2] text-[#1D9E75] group-hover:bg-[#E6F7EE]"
              }`}
            >
              <SelectedIcon size={13} />
            </span>
          )}
          <span
            className={`truncate font-medium ${
              selectedOption ? "text-[#0F3D2E]" : "text-[#6B8575]"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-[#426352] transition-transform duration-200 ${
            open ? "rotate-180 text-[#1D9E75]" : "group-hover:text-[#0F3D2E]"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-72 overflow-y-auto rounded-xl border border-emerald-900/15 bg-white/95 p-1.5 shadow-[0_22px_48px_-14px_rgba(15,61,46,0.24)] backdrop-blur-md"
          >
            {options.map((option, idx) => {
              const isSelected = option.value === value;
              const isHighlighted = idx === highlightedIndex;
              const OptionIcon = option.icon;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => selectOption(option)}
                    className={`flex w-full items-start justify-between gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 ${
                      isSelected
                        ? "bg-[#E8F8F0] text-[#0F3D2E]"
                        : isHighlighted
                          ? "bg-[#F4FAF7] text-[#0F3D2E]"
                          : "text-[#2D5542] hover:bg-[#F4FAF7]"
                    }`}
                  >
                    <span className="flex min-w-0 items-start gap-2.5">
                      {OptionIcon && (
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${
                            isSelected
                              ? "bg-[#1D9E75] text-white shadow-sm"
                              : "bg-[#EEF7F2] text-[#1D9E75]"
                          }`}
                        >
                          <OptionIcon size={13} />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold leading-snug text-[#0F3D2E]">
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="mt-0.5 block text-[11px] leading-snug text-[#527362]">
                            {option.description}
                          </span>
                        )}
                      </span>
                    </span>

                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                        aria-hidden="true"
                        className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1D9E75] text-white"
                      >
                        <Check size={10} strokeWidth={3} />
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
