import { cva } from "class-variance-authority";

export const followersReportVariants = cva(
  "mt-6 p-4 backdrop-blur-sm rounded-lg border",
  {
    variants: {
      color: {
        default: "bg-gray-900/50 border-gray-700/50",
        danger: "bg-red-900/30 border-red-700/50",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export const followersReportTagVariants = cva(
  "px-2 py-1 text-xs font-medium rounded-md",
  {
    variants: {
      color: {
        default: "bg-gray-700/50 text-gray-300",
        danger: "bg-red-700/50 text-red-200",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export const followersReportCardVariants = cva(
  "group relative rounded-md p-2 transition-all duration-200 hover:scale-105",
  {
    variants: {
      color: {
        default: "bg-gray-800/40 border border-gray-700/30 hover:bg-gray-700/40",
        danger: "bg-red-900/20 border border-red-700/30 hover:bg-red-800/30",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export const followersReportDotVariants = cva(
  "w-1.5 h-1.5 rounded-full",
  {
    variants: {
      color: {
        default: "bg-gray-500",
        danger: "bg-red-500",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export const followersReportTextVariants = cva(
  "text-xs font-medium truncate",
  {
    variants: {
      color: {
        default: "text-gray-200",
        danger: "text-red-200",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);
