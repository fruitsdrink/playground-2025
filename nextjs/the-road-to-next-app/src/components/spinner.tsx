import { LucideLoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div className="flex-1 place-items-center grid self-center">
      <LucideLoaderCircle className="size-16 animate-spin" />
    </div>
  );
}
