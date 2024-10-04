// Create a custom hook to check if the user is a client
"use client"
import { useEffect, useState } from "react";

export const useIsClients = () => {
  const [isClients, setIsClients] = useState(false);

  useEffect(() => {
    const checkIsClients = async () => {
      const response = await fetch("/api/is-clients");
      const data = await response.json();
      setIsClients(data.isClients);
    };

    checkIsClients();
  }, []);

  return isClients;
};