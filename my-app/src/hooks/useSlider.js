import { useEffect, useState } from "react";

const INTERVAL_MS = 6500;

export default function useSlider(count) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((x) => (x + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  return [index, setIndex];
}
