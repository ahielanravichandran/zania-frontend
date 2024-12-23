import { cn } from "../utils";

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900",
      className
    )}
  />
);
