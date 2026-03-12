import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { HourlyData } from "@/lib/mock-data";

interface WeatherImpactChartProps {
  data: HourlyData[];
}

const variables = [
  { key: "radiation", label: "Radiation", color: "hsl(45, 100%, 51%)" },
  { key: "temperature", label: "Temperature", color: "hsl(0, 84%, 60%)" },
  { key: "humidity", label: "Humidity", color: "hsl(200, 80%, 55%)" },
  { key: "windSpeed", label: "Wind Speed", color: "hsl(150, 60%, 45%)" },
] as const;

const WeatherImpactChart = ({ data }: WeatherImpactChartProps) => {
  const [active, setActive] = useState<Set<string>>(new Set(["radiation", "temperature"]));

  const toggle = (key: string) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const chartData = data.map(d => ({
    hour: `${d.hour}:00`,
    production: d.production,
    radiation: d.radiation / 100,
    temperature: d.temperature,
    humidity: d.humidity,
    windSpeed: d.windSpeed,
  }));

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">Weather Impact on Production</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {variables.map(v => (
          <button
            key={v.key}
            onClick={() => toggle(v.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              active.has(v.key)
                ? "border-foreground/30 bg-foreground/5 text-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: v.color }} />
            {v.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
          <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 100%)',
              border: '1px solid hsl(214, 20%, 90%)',
              borderRadius: '8px',
            }}
          />
          <Line type="monotone" dataKey="production" stroke="hsl(215, 80%, 28%)" strokeWidth={2} name="Production (MW)" dot={false} />
          {variables.map(v =>
            active.has(v.key) ? (
              <Line key={v.key} type="monotone" dataKey={v.key} stroke={v.color} strokeWidth={1.5} strokeDasharray="4 2" name={v.label} dot={false} />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherImpactChart;
