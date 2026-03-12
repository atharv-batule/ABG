import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Loader2, Zap, Sun, Clock, Gauge } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ProductionChart from "@/components/ProductionChart";
import WeatherSummary from "@/components/WeatherSummary";
import SolarWindow from "@/components/SolarWindow";
import InsightPanel from "@/components/InsightPanel";
import { generateForecast, generateInsights, DailyForecast } from "@/lib/mock-data";

const ForecastPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DailyForecast | null>(null);

  const handlePredict = async () => {
    if (!selectedDate) return;
    setLoading(true);
    setResult(null);

    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    const forecast = generateForecast(selectedDate);
    setResult(forecast);
    setLoading(false);
  };

  const insights = result ? generateInsights(result) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Solar Forecast</h1>
          <p className="text-muted-foreground mt-1">Predict solar power generation for any future date</p>
        </div>

        {/* Input Section */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Future Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <button
              onClick={handlePredict}
              disabled={!selectedDate || loading}
              className="solar-gradient px-8 py-2.5 rounded-lg font-display font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running AI Prediction...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Predict Solar Production
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl p-12 text-center mb-8"
            >
              <Loader2 className="w-12 h-12 animate-spin text-solar-yellow mx-auto mb-4" />
              <p className="font-display font-semibold text-foreground">Fetching weather forecast...</p>
              <p className="text-sm text-muted-foreground mt-1">Running AI prediction model</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard title="Predicted Daily Output" value={result.totalProduction.toFixed(1)} unit="MWh" icon={Sun} delay={0} />
                <MetricCard title="Peak Generation Hour" value={`${result.peakHour}:00`} icon={Clock} delay={0.1} />
                <MetricCard title="Peak Production" value={result.peakProduction.toFixed(1)} unit="MW" icon={Zap} delay={0.2} />
                <MetricCard title="Solar Potential Score" value={result.solarPotentialScore} unit="/100" icon={Gauge} delay={0.3} />
              </div>

              {/* Solar Window */}
              <div className="mb-8">
                <SolarWindow
                  startHour={result.optimalWindowStart}
                  endHour={result.optimalWindowEnd}
                  production={result.optimalWindowProduction}
                />
              </div>

              {/* Chart */}
              <div className="mb-8">
                <ProductionChart data={result.hourlyData} title="Hourly Forecast Chart" />
              </div>

              {/* Weather + Insights */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <WeatherSummary data={result.hourlyData} />
                <InsightPanel insights={insights} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ForecastPage;
