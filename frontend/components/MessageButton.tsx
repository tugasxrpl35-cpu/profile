// components/ui/message-button.tsx

"use client";

import React from "react";
import clsx from "clsx";

type MessageButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

export default function MessageButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}: MessageButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Variants
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",

          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400":
            variant === "secondary",

          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "danger",

          // States
          "opacity-50 cursor-not-allowed": disabled || loading,

          // Width
          "w-full": fullWidth,
        }
      )}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        icon
      )}

      <span>{children}</span>
    </button>
  );
}