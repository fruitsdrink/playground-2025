import { ThemeProvider as BaseThemeProvider } from "next-themes";

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <BaseThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
      {children}
    </BaseThemeProvider>
  );
};
