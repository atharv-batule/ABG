export type BackendForecastRow = {
  "Date-Hour": string;
  "PredictedSolarPower": number;
};

export async function fetchSolarForecast() {
  const res = await fetch("/api/solar-forecast");
  if (!res.ok) throw new Error("Forecast fetch failed");
  return (await res.json()) as BackendForecastRow[];
}
