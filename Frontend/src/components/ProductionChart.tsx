import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { HourlyData } from "@/lib/types.ts";

interface ProductionChartProps {
  data: HourlyData[];
  title?: string;
}

const ProductionChart = ({ data, title = "Hourly Solar Production" }: ProductionChartProps) => {
  const chartData = data.map(d => ({
    hour: `${d.hour}:00`,
    production: d.production,
  }));

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
          <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" label={{ value: 'MW', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 100%)',
              border: '1px solid hsl(214, 20%, 90%)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="production"
            stroke="hsl(45, 100%, 51%)"
            strokeWidth={3}
            fill="url(#solarGradient)"
            name="Predicted Production"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;
