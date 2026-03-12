import { getHeatmapData } from "@/lib/mock-data";

interface RadiationHeatmapProps {
  days?: number;
}

const RadiationHeatmap = ({ days = 7 }: RadiationHeatmapProps) => {
  const data = getHeatmapData(days);

  const allValues = data.flatMap(d => d.hours.map(h => h.radiation));
  const maxRad = Math.max(...allValues);

  const getColor = (value: number) => {
    const ratio = value / maxRad;
    if (ratio > 0.8) return "bg-solar-yellow";
    if (ratio > 0.6) return "bg-solar-amber";
    if (ratio > 0.4) return "bg-solar-orange/70";
    if (ratio > 0.2) return "bg-solar-orange/40";
    if (ratio > 0.05) return "bg-solar-orange/20";
    return "bg-muted/50";
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">Radiation Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex gap-0.5 mb-1 pl-20">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="w-6 text-center text-[9px] text-muted-foreground">{i}</div>
            ))}
          </div>
          {data.map((day) => (
            <div key={day.date} className="flex items-center gap-0.5 mb-0.5">
              <span className="w-20 text-[10px] text-muted-foreground text-right pr-2">{day.date.slice(5)}</span>
              {day.hours.map((h) => (
                <div
                  key={h.hour}
                  className={`w-6 h-5 rounded-sm ${getColor(h.radiation)} transition-colors`}
                  title={`${day.date} ${h.hour}:00 - ${h.radiation} W/m²`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
        <span>Low</span>
        <div className="flex gap-0.5">
          <span className="w-4 h-3 rounded-sm bg-muted/50" />
          <span className="w-4 h-3 rounded-sm bg-solar-orange/20" />
          <span className="w-4 h-3 rounded-sm bg-solar-orange/40" />
          <span className="w-4 h-3 rounded-sm bg-solar-orange/70" />
          <span className="w-4 h-3 rounded-sm bg-solar-amber" />
          <span className="w-4 h-3 rounded-sm bg-solar-yellow" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
};

export default RadiationHeatmap;
