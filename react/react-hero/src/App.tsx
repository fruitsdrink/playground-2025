import { useAppRouter } from "./hooks";

function App() {
  const { AppRouterProvider } = useAppRouter();
  return <AppRouterProvider />;
}

export default App;
