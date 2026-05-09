export default function NarrativeInsights({
  highRisk,
  businessHealth
}) {

  const narrative =

    businessHealth > 80

      ? "AI detected stable business performance with healthy retention and low churn pressure across customer segments."

      : "AI identified moderate business pressure requiring retention optimization and customer engagement improvement.";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Narrative AI Insights
      </h2>

      <div className="insight-card">

        <p>
          {narrative}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          High Risk Customers
        </strong>

        <p>
          {highRisk}
          monitored customers
        </p>

      </div>

    </div>

  );

}