import { useEffect, useState } from "react";

export function useStatisics(dataPointCount: number) {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setValue((prev) => {
        const data = [...prev, stats];
        if (data.length > dataPointCount) {
          data.shift();
        }

        return data;
      })
    );
    return unsub;
  }, [dataPointCount]);

  return value;
}
