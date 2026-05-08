export default function OptimizationInsights({

  retentionRate,
  marketingBudget

}) {

  const insight =

    retentionRate > 85

      ? "Retention strategy highly optimized for long-term growth."

      : "Increasing retention can significantly improve business stability.";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Optimization Insights
      </h2>

      <div className="insight-card">

        <p>
          {insight}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Marketing Recommendation
        </strong>

        <p>
          ₹{marketingBudget + 25}K
          suggested optimized budget.
        </p>

      </div>

    </div>

  );

}