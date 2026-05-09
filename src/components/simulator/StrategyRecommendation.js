export default function StrategyRecommendation({

  retentionRate,
  marketingBudget

}) {

  const recommendation =

    retentionRate > 85

      ? "Retention strategy performing strongly."

      : "Increase loyalty investment to improve retention.";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        AI Recommendation
      </h2>

      <div className="insight-card">

        <p>
          {recommendation}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Suggested Marketing
        </strong>

        <p>
          ₹{marketingBudget + 20}K
          optimized budget recommended.
        </p>

      </div>

    </div>

  );

}