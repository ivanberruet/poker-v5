import { fetchSheetsFailure, fetchSheetsStart, fetchSheetsSuccess } from "@/reducers/sheetsSlice";
import { useDispatch } from "react-redux";

export default function useSheets() {
  const dispatch = useDispatch();

  const fetchSheetsData = async (ranges) => {
    try {
      dispatch(fetchSheetsStart());

      const results = {}; // Object to store all fetched data
      for (const item of ranges) {
        const response = await fetch(`/api/sheets?range=${encodeURIComponent(item.range)}`);
        if (!response.ok) throw new Error(`Failed to fetch range: ${item.range}`);

        const values = await response.json();
        results[item.name] = values; // Collect the data by key
      }

      dispatch(fetchSheetsSuccess(results)); // Dispatch all data at once
    } catch (error) {
      dispatch(fetchSheetsFailure(error.message));
    }
  };

  return { fetchSheetsData };
}
