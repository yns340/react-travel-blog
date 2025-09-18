import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay); //delay süresi kadar sonra set yapar

    return () => clearTimeout(handler); // component unmount veya value değişirse temizle
  }, [value, delay]);

  return debouncedValue;
}
