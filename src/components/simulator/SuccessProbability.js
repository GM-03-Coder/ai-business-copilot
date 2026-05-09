export default function SuccessProbability({
  roi
}) {

  const probability = Math.min(
    98,
    roi - 25
  );

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Success Probability
      </h2>

      <div className="health-score">
        {probability}%
      </div>

      <p
        style={{
          marginTop: "12px",
          color: "#94a3b8"
        }}
      >
        Estimated probability of
        successful strategy execution.
      </p>

    </div>

  );

}