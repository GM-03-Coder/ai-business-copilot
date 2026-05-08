export default function BusinessImpactCard({
  highRiskCustomers,
  totalCustomers
}) {

  const revenueAtRisk =
    highRiskCustomers * 52000;

  const recoveryPotential =
    revenueAtRisk * 0.32;

  const riskPercentage = (

    (
      highRiskCustomers /
      totalCustomers
    ) * 100

  ).toFixed(2);

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Business Impact
      </h2>

      <div className="insight-card">

        <strong>
          Revenue At Risk
        </strong>

        <p>
          ₹
          {revenueAtRisk.toLocaleString()}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Recovery Potential
        </strong>

        <p>
          ₹
          {Math.floor(
            recoveryPotential
          ).toLocaleString()}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          High Risk Ratio
        </strong>

        <p>
          {riskPercentage}%
          of total customers
        </p>

      </div>

    </div>

  );

}