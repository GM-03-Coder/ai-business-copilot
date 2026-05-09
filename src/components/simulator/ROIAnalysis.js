export default function ROIAnalysis({
  roi
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        ROI Analysis
      </h2>

      <div className="health-score">
        {roi}%
      </div>

      <p
        style={{
          marginTop: "12px",
          color: "#94a3b8"
        }}
      >
        Expected return based on
        simulated business investment.
      </p>

    </div>

  );

}