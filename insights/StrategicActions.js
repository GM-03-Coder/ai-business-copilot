export default function StrategicActions({
  highRisk,
  avgRisk
}) {

  const immediateAction =

    highRisk > 500

      ? "Launch customer retention campaign immediately"

      : "Maintain customer engagement strategy";

  const shortTerm =

    avgRisk > 10

      ? "Improve loyalty rewards and customer targeting"

      : "Expand VIP engagement programs";

  const longTerm =

    highRisk > 500

      ? "Build automated churn prevention workflows"

      : "Scale long-term customer loyalty ecosystem";

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Strategic Actions
      </h2>

      <div className="insight-card">

        <strong>
          Immediate
        </strong>

        <p>
          {immediateAction}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Short-Term
        </strong>

        <p>
          {shortTerm}
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Long-Term
        </strong>

        <p>
          {longTerm}
        </p>

      </div>

    </div>

  );

}