import Navbar from "./features/shared/components/Navbar";
import { ThemeProvider } from "./features/shared/components/ThemeProvider";
import { Toaster } from "./features/shared/components/ui/Toaster";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster />
      <div className="flex gap-8 justify-center pb-8">
        <Navbar />
        <div className="w-full max-w-2xl min-h-screen">
          <header className="p-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-xl font-bold text-center">
              Advanced Patterns React
            </h1>
            <p className="text-sm text-center text-neutral-500">
              <b>
                <span className="dark:text-primary-500">Cosden</span> Solutions
              </b>
            </p>
          </header>
          <div className="p-4 space-y-4">
            <img
              src="/500w-logo.png"
              alt="logo"
              className="mx-auto w-24 h-24"
            />
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-center">
                Welcome to the course!
              </h1>
              <p className="text-lg text-center text-neutral-500">
                You're going to build a lot of great things here. Let's get
                started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
