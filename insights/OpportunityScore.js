export default function OpportunityScore({
  businessHealth
}) {

  const upsell =
    Math.min(
      95,
      businessHealth + 8
    );

  const retention =
    Math.min(
      98,
      businessHealth + 12
    );

  const growth =
    Math.min(
      92,
      businessHealth + 5
    );

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Opportunity Score
      </h2>

      <div className="insight-card">

        <strong>
          Upsell Opportunity
        </strong>

        <p>
          {upsell}%
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Retention Opportunity
        </strong>

        <p>
          {retention}%
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Growth Opportunity
        </strong>

        <p>
          {growth}%
        </p>

      </div>

    </div>

  );

}