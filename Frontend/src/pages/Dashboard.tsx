import { useMemo } from "react";
import { Zap, Sun, Clock, Gauge } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ProductionChart from "@/components/ProductionChart";
import SolarTimeline from "@/components/SolarTimeline";
import WeatherImpactChart from "@/components/WeatherImpactChart";
import RadiationHeatmap from "@/components/RadiationHeatmap";
import InsightPanel from "@/components/InsightPanel";
import SolarWindow from "@/components/SolarWindow";
import { generateForecast, generateInsights } from "@/lib/mock-data";

const Dashboard = () => {
  const forecast = useMemo(() => generateForecast(new Date().toISOString().split('T')[0]), []);
  const insights = useMemo(() => generateInsights(forecast), [forecast]);
  const latestProd = forecast.hourlyData.find(d => d.hour === new Date().getHours())?.production ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time solar energy overview</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Current Production" value={latestProd.toFixed(1)} unit="MW" icon={Zap} trend="+5% from yesterday" trendPositive delay={0} />
          <MetricCard title="Predicted Daily Output" value={forecast.totalProduction.toFixed(1)} unit="MWh" icon={Sun} trend="On track" trendPositive delay={0.1} />
          <MetricCard title="Peak Generation Hour" value={`${forecast.peakHour}:00`} icon={Clock} delay={0.2} />
          <MetricCard title="Solar Potential Score" value={forecast.solarPotentialScore} unit="/100" icon={Gauge} delay={0.3} />
        </div>

        {/* Solar Window */}
        <div className="mb-8">
          <SolarWindow
            startHour={forecast.optimalWindowStart}
            endHour={forecast.optimalWindowEnd}
            production={forecast.optimalWindowProduction}
          />
        </div>

        {/* Main Chart */}
        <div className="mb-8">
          <ProductionChart data={forecast.hourlyData} />
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <SolarTimeline data={forecast.hourlyData} />
        </div>

        {/* Weather Impact + Insights */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <WeatherImpactChart data={forecast.hourlyData} />
          <InsightPanel insights={insights} />
        </div>

        {/* Heatmap */}
        <div className="mb-8">
          <RadiationHeatmap days={7} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
