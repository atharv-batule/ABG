// Mock data service for SunCast AI

export interface HourlyData {
  hour: number;
  production: number;
  radiation: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  sunshine: number;
  airPressure: number;
}

export interface DailyForecast {
  date: string;
  hourlyData: HourlyData[];
  totalProduction: number;
  peakHour: number;
  peakProduction: number;
  solarPotentialScore: number;
  optimalWindowStart: number;
  optimalWindowEnd: number;
  optimalWindowProduction: number;
}

export interface InsightItem {
  icon: string;
  title: string;
  description: string;
  type: 'positive' | 'neutral' | 'warning';
}

function generateHourlyData(): HourlyData[] {
  return Array.from({ length: 24 }, (_, hour) => {
    const solarFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
    const cloudNoise = Math.random() * 0.3;
    const production = Math.max(0, solarFactor * (1 - cloudNoise) * 12 + (Math.random() - 0.5) * 0.5);
    const radiation = Math.max(0, solarFactor * 900 + (Math.random() - 0.5) * 100);
    const temperature = 18 + solarFactor * 14 + (Math.random() - 0.5) * 3;
    const humidity = 65 - solarFactor * 25 + (Math.random() - 0.5) * 10;
    const windSpeed = 8 + Math.random() * 12;
    const sunshine = Math.max(0, solarFactor * 60);
    const airPressure = 1013 + (Math.random() - 0.5) * 10;

    return {
      hour,
      production: Math.round(production * 100) / 100,
      radiation: Math.round(radiation),
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity),
      windSpeed: Math.round(windSpeed * 10) / 10,
      sunshine: Math.round(sunshine),
      airPressure: Math.round(airPressure * 10) / 10,
    };
  });
}

export function generateForecast(date: string): DailyForecast {
  const hourlyData = generateHourlyData();
  const totalProduction = Math.round(hourlyData.reduce((sum, d) => sum + d.production, 0) * 100) / 100;
  const peakEntry = hourlyData.reduce((max, d) => d.production > max.production ? d : max, hourlyData[0]);
  
  const sorted = [...hourlyData].sort((a, b) => b.production - a.production);
  const topHours = sorted.slice(0, 4).map(d => d.hour).sort((a, b) => a - b);
  const optimalStart = topHours[0];
  const optimalEnd = topHours[topHours.length - 1];
  const optimalProduction = hourlyData
    .filter(d => d.hour >= optimalStart && d.hour <= optimalEnd)
    .reduce((sum, d) => sum + d.production, 0);

  return {
    date,
    hourlyData,
    totalProduction,
    peakHour: peakEntry.hour,
    peakProduction: peakEntry.production,
    solarPotentialScore: Math.round(Math.min(100, (totalProduction / 80) * 100)),
    optimalWindowStart: optimalStart,
    optimalWindowEnd: optimalEnd,
    optimalWindowProduction: Math.round(optimalProduction * 100) / 100,
  };
}

export function generateInsights(forecast: DailyForecast): InsightItem[] {
  const avgProd = 55;
  const diff = ((forecast.totalProduction - avgProd) / avgProd * 100).toFixed(0);
  const isAbove = forecast.totalProduction > avgProd;

  return [
    {
      icon: '☀️',
      title: 'Peak Generation Time',
      description: `Peak solar generation expected at ${forecast.peakHour}:00 with ${forecast.peakProduction.toFixed(1)} MW output.`,
      type: 'positive',
    },
    {
      icon: '📊',
      title: 'Production vs Average',
      description: `Production predicted ${Math.abs(Number(diff))}% ${isAbove ? 'higher' : 'lower'} than historical average.`,
      type: isAbove ? 'positive' : 'warning',
    },
    {
      icon: '🕐',
      title: 'Optimal Solar Window',
      description: `Best generation window: ${forecast.optimalWindowStart}:00 AM – ${forecast.optimalWindowEnd}:00 PM`,
      type: 'positive',
    },
    {
      icon: '🔋',
      title: 'Battery Storage Window',
      description: `Recommended charging: ${forecast.optimalWindowStart}:00 – ${forecast.optimalWindowEnd}:00. Expected: ${forecast.optimalWindowProduction.toFixed(1)} MWh`,
      type: 'neutral',
    },
    {
      icon: '🌡️',
      title: 'Temperature Impact',
      description: `Average temperature during peak hours supports optimal panel efficiency.`,
      type: 'positive',
    },
  ];
}

export function generateHistoricalData(days: number = 14): DailyForecast[] {
  const data: DailyForecast[] = [];
  const today = new Date();
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push(generateForecast(date.toISOString().split('T')[0]));
  }
  return data;
}

export function getHeatmapData(days: number = 7) {
  const historical = generateHistoricalData(days);
  return historical.map(day => ({
    date: day.date,
    hours: day.hourlyData.map(h => ({
      hour: h.hour,
      radiation: h.radiation,
    })),
  }));
}
