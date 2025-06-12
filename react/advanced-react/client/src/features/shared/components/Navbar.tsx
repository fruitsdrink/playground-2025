import { ThemeToggle } from "./ThemeToggle";

export default function Navigation() {
  return (
    <nav className="flex flex-col gap-4 pt-8 w-64">
      <ThemeToggle />
    </nav>
  );
}
