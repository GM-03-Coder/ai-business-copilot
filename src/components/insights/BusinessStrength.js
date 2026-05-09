export default function BusinessStrength({
  highRisk
}) {

  const strength =

    highRisk < 500

      ? "Customer retention and loyalty remain strong."

      : "Customer stability weakening due to churn exposure.";

  const weakness =

    highRisk > 500

      ? "At-risk customer growth increasing."

      : "Minor churn monitoring required.";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Business Strength Analysis
      </h2>

      <div className="insight-card">

        <strong>
          Strong Areas
        </strong>

        <p>
          {strength}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Weak Areas
        </strong>

        <p>
          {weakness}
        </p>

      </div>

    </div>

  );

}