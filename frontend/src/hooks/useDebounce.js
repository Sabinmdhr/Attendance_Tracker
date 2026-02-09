import { useEffect, useState } from "react";

export function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 700);

    return () => clearTimeout(timer);
  });

  return debouncedValue;
}
