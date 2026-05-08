export default function RiskImpact({
  projectedChurn
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Risk Impact
      </h2>

      <div className="insight-card">

        <strong>
          Churn Reduction
        </strong>

        <p>
          Estimated churn after
          strategy execution:
          {" "}
          {projectedChurn}%
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Stability Increase
        </strong>

        <p>
          Customer retention expected
          to improve significantly.
        </p>

      </div>

    </div>

  );

}