import { Button } from "./ui/Button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      className="justify-start p-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-6 h-6" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="w-6 h-6" />
          Dark Mode
        </>
      )}
    </Button>
  );
}
