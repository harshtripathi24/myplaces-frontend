import { useEffect, useRef, useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequsts = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortControler = new AbortController();
      activeHttpRequsts.current.push(httpAbortControler);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortControler.signal,
        });

        const responseData = await response.json();

        activeHttpRequsts.current = activeHttpRequsts.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortControler
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);

        console.log(err);

        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = (event) => {
    event.preventDefault();
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequsts.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
