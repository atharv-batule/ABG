import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";

interface SolarWindowProps {
  startHour: number;
  endHour: number;
  production: number;
}

const SolarWindow = ({ startHour, endHour, production }: SolarWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="solar-gradient rounded-xl p-6 glow-solar"
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-primary-foreground" />
        <h3 className="font-display font-bold text-primary-foreground">Optimal Solar Window</h3>
      </div>
      <div className="flex items-center gap-3 text-primary-foreground">
        <Clock className="w-8 h-8" />
        <div>
          <p className="text-2xl font-display font-bold">
            {startHour}:00 – {endHour}:00
          </p>
          <p className="text-sm opacity-80">Expected Generation: {production.toFixed(1)} MWh</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SolarWindow;
