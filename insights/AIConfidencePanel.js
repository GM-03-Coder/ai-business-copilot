export default function AIConfidencePanel({
  accuracy
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        AI Confidence
      </h2>

      <div className="insight-card">

        <strong>
          Prediction Accuracy
        </strong>

        <p>
          {accuracy}%
        </p>

      </div>

      <div className="insight-card">

        <strong>
          AI Reliability
        </strong>

        <p>
          High confidence prediction model
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Data Stability
        </strong>

        <p>
          Stable business intelligence detected
        </p>

      </div>

    </div>

  );

}