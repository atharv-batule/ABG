import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import Navbar from "@/components/Navbar";
import RadiationHeatmap from "@/components/RadiationHeatmap";
import { generateHistoricalData } from "@/lib/mock-data";

const AnalyticsPage = () => {
  const historical = useMemo(() => generateHistoricalData(14), []);

  const dailyTrend = historical.map(d => ({
    date: d.date.slice(5),
    production: d.totalProduction,
  }));

  const scatterRadiation = historical.flatMap(d =>
    d.hourlyData.map(h => ({ radiation: h.radiation, production: h.production }))
  );

  const scatterTemp = historical.flatMap(d =>
    d.hourlyData.map(h => ({ temperature: h.temperature, production: h.production }))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep data exploration and trend analysis</p>
        </div>

        {/* Daily Trend */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">Solar Production Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" label={{ value: 'MWh', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="production" stroke="hsl(215, 80%, 28%)" strokeWidth={2} dot={{ fill: 'hsl(45, 100%, 51%)', r: 4 }} name="Daily Production (MWh)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Plots */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Radiation vs Production</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="radiation" name="Radiation (W/m²)" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
                <YAxis dataKey="production" name="Production (MW)" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Scatter data={scatterRadiation} fill="hsl(45, 100%, 51%)" opacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Temperature vs Production</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="temperature" name="Temperature (°C)" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
                <YAxis dataKey="production" name="Production (MW)" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214, 20%, 90%)', borderRadius: '8px' }} />
                <Scatter data={scatterTemp} fill="hsl(200, 80%, 55%)" opacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <RadiationHeatmap days={14} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
