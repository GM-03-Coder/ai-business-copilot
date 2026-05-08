export default function RevenueIntelligence({
  highRisk
}) {

  const revenueRisk =
    highRisk * 52000;

  const recovery =
    revenueRisk * 0.32;

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Revenue Intelligence
      </h2>

      <div className="insight-card">

        <strong>
          Revenue At Risk
        </strong>

        <p>
          ₹
          {Math.floor(
            revenueRisk
          ).toLocaleString()}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Recovery Potential
        </strong>

        <p>
          ₹
          {Math.floor(
            recovery
          ).toLocaleString()}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Revenue Stability
        </strong>

        <p>
          Stable revenue outlook predicted
        </p>

      </div>

    </div>

  );

}