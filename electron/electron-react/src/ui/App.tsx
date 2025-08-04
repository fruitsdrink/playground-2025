import "./App.css";
import { useStatisics } from "./useStatistics";
import { useEffect, useMemo, useState } from "react";
import { Chart } from "./Chart";

function App() {
  const [view, setView] = useState<View>("CPU");

  const statistics = useStatisics(10);

  const cpuUsage = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsage = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsage = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );

  const activeUsage = useMemo(() => {
    switch (view) {
      case "CPU":
        return cpuUsage;
      case "RAM":
        return ramUsage;
      case "STORAGE":
        return storageUsage;
    }
  }, [cpuUsage, ramUsage, storageUsage, view]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => {
      setView(view);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <button
          id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
        />
        <button
          id="minimize"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
        />
        <button
          id="maximize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
        />
      </header>
      <div style={{ height: 120 }}>
        <Chart data={activeUsage} maxDataPoints={10} selectedView="CPU" />
      </div>
    </div>
  );
}

export default App;
