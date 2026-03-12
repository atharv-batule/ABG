import { InsightItem } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface InsightPanelProps {
  insights: InsightItem[];
  title?: string;
}

const typeStyles = {
  positive: "border-l-energy-green bg-energy-green/5",
  neutral: "border-l-sky-blue bg-sky-blue/5",
  warning: "border-l-solar-orange bg-solar-orange/5",
};

const InsightPanel = ({ insights, title = "AI Insights" }: InsightPanelProps) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-l-4 rounded-r-lg p-4 ${typeStyles[insight.type]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{insight.icon}</span>
              <div>
                <p className="font-medium text-sm text-foreground">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InsightPanel;
