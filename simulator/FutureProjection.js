export default function FutureProjection({
  projectedRevenue
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        Future Projection
      </h2>

      <div className="insight-card">

        <strong>
          Revenue Forecast
        </strong>

        <p>
          Revenue may reach
          ₹{projectedRevenue + 15}M
          within next cycle.
        </p>

      </div>

      <div className="insight-card">

        <strong>
          Business Growth
        </strong>

        <p>
          Growth trajectory remains
          positive under current simulation.
        </p>

      </div>

    </div>

  );

}