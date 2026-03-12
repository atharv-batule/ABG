import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, BarChart3, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-solar.jpg";

const features = [
  {
    icon: Sun,
    title: "Weather Intelligence",
    description: "Real-time weather data integrated with ML predictions for accurate solar forecasting.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep data exploration with radiation heatmaps, trend analysis, and correlation charts.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Automatically generated insights for peak hours, storage windows, and efficiency.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Solar energy landscape" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
              <Sun className="w-4 h-4 text-accent-foreground" />
              <span className="text-xs font-medium text-accent-foreground">SunCast AI Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              AI-Powered Solar
              <br />
              <span className="text-gradient-solar">Energy Forecasting</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Predict solar power generation using weather intelligence and machine learning. Optimize energy production, storage, and grid management.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 solar-gradient px-8 py-3.5 rounded-xl font-display font-semibold text-primary-foreground hover:opacity-90 transition-opacity glow-solar"
              >
                View Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/forecast"
                className="inline-flex items-center gap-2 border border-border bg-card px-8 py-3.5 rounded-xl font-display font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Try Forecast
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
