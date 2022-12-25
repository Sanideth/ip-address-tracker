import { useEffect, useState } from "react";

export const useGet = <T>(
  initialUrl: string | null | undefined,
  initialData: T | null | undefined
): [
  T | null | undefined,
  React.Dispatch<React.SetStateAction<string | null | undefined>>,
  React.Dispatch<React.SetStateAction<T | null | undefined>>
] => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async (url: string) => {
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        setData(data);
      }
    };
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return [data, setUrl, setData];
};
