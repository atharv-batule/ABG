import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  delay?: number;
}

const MetricCard = ({ title, value, unit, icon: Icon, trend, trendPositive, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-display font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trendPositive ? 'text-energy-green' : 'text-solar-orange'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
