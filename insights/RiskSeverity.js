export default function RiskSeverity({
  avgRisk
}) {

  let severity =
    "Low";

  if (avgRisk > 20) {

    severity = "Critical";

  }

  else if (
    avgRisk > 10
  ) {

    severity = "High";

  }

  else if (
    avgRisk > 5
  ) {

    severity = "Moderate";

  }

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Risk Severity
      </h2>

      <div className="health-score">
        {severity}
      </div>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "10px"
        }}
      >
        AI evaluated current business risk exposure
      </p>

    </div>

  );

}