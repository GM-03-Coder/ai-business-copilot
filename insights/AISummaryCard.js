export default function AISummaryCard({
  highRisk,
  businessHealth
}) {

  const summary =

    highRisk < 500

      ? "AI analysis indicates strong customer retention and stable business growth with controlled churn exposure."

      : "AI detected elevated churn exposure requiring immediate retention and engagement strategies.";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        AI Executive Summary
      </h2>

      <div className="insight-card">

        <p>
          {summary}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Business Health
        </strong>

        <p>
          {businessHealth}/100
        </p>

      </div>

    </div>

  );

}