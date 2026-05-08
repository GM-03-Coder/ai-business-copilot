import StatCard from "../cards/StatCard";

export default function SimulationKPIs({

  projectedRevenue,
  projectedHealth,
  projectedChurn,
  roi

}) {

  return (

    <div className="kpi-grid">

      <StatCard
        title="Projected Revenue"
        value={`₹${projectedRevenue}M`}
        change="+12%"
        color="#00E5FF"
      />

      <StatCard
        title="Business Health"
        value={`${projectedHealth}/100`}
        change="+5%"
        color="#39FF14"
      />

      <StatCard
        title="Projected Churn"
        value={`${projectedChurn}%`}
        change="-2%"
        color="#FF4D6D"
      />

      <StatCard
        title="Expected ROI"
        value={`${roi}%`}
        change="+8%"
        color="#8B5CF6"
      />

    </div>

  );

}