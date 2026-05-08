export default function SmartAlerts({
  highRisk
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Smart Alerts
      </h2>

      <div className="insight-card">

        <strong>
          Critical
        </strong>

        <p>
          {highRisk}
          high-risk customers detected
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Revenue Alert
        </strong>

        <p>
          Revenue protection strategy recommended
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Retention Alert
        </strong>

        <p>
          Customer engagement monitoring active
        </p>

      </div>

    </div>

  );

}