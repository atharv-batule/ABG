import { Thermometer, Droplets, Sun, Wind, Clock } from "lucide-react";
import { HourlyData } from "@/lib/mock-data";

interface WeatherSummaryProps {
  data: HourlyData[];
}

const WeatherSummary = ({ data }: WeatherSummaryProps) => {
  const midday = data.find(d => d.hour === 12) || data[0];
  const avgTemp = (data.reduce((s, d) => s + d.temperature, 0) / data.length).toFixed(1);
  const avgHumidity = Math.round(data.reduce((s, d) => s + d.humidity, 0) / data.length);
  const maxRad = Math.max(...data.map(d => d.radiation));
  const avgWind = (data.reduce((s, d) => s + d.windSpeed, 0) / data.length).toFixed(1);
  const sunshineHrs = data.filter(d => d.sunshine > 30).length;

  const items = [
    { icon: Thermometer, label: "Avg Temperature", value: `${avgTemp}°C` },
    { icon: Droplets, label: "Avg Humidity", value: `${avgHumidity}%` },
    { icon: Sun, label: "Peak Radiation", value: `${maxRad} W/m²` },
    { icon: Wind, label: "Avg Wind Speed", value: `${avgWind} m/s` },
    { icon: Clock, label: "Sunshine Hours", value: `${sunshineHrs}h` },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">Weather Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mx-auto mb-2">
              <item.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
            <p className="text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
