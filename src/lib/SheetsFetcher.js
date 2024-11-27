'use client'; // Ensure it's a client component

import { useEffect } from "react";
import useSheets from "@/hooks/useSheets";

export default function SheetsFetcher() {
  const { fetchSheetsData } = useSheets();

  useEffect(() => {
    const ranges = [
      {name: "players", range: "Jugadores!A2:C"},
      {name: "chips", range: "Fichas!A2:F"},
      {name: "structure", range: "Estructura!A2:C"},
      {name: "history", range: "Historial!A2:I"},
    ];
    fetchSheetsData(ranges);
  }, [fetchSheetsData]);

  return null; // This component does not render anything
}
