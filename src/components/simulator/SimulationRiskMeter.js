export default function SimulationRiskMeter({
  projectedChurn
}) {

  let risk =
    "Low";

  if (projectedChurn > 15) {

    risk = "High";

  }

  else if (
    projectedChurn > 8
  ) {

    risk = "Moderate";

  }

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Simulation Risk Meter
      </h2>

      <div className="health-score">
        {risk}
      </div>

      <p
        style={{
          marginTop: "10px",
          color: "#94a3b8"
        }}
      >
        AI evaluated projected
        business risk level.
      </p>

    </div>

  );

}