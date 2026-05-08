export default function BeforeAfterComparison({

  projectedRevenue,
  projectedChurn

}) {

  return (

    <div className="table-card">

      <h2
        className="chart-title"
        style={{
          marginBottom: "18px"
        }}
      >
        Before vs After Simulation
      </h2>

      <table>

        <thead>

          <tr>

            <th>
              Metric
            </th>

            <th>
              Current
            </th>

            <th>
              Simulated
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>
              Revenue
            </td>

            <td>
              ₹{projectedRevenue - 18}M
            </td>

            <td>
              ₹{projectedRevenue}M
            </td>

          </tr>

          <tr>

            <td>
              Churn
            </td>

            <td>
              {projectedChurn + 2}%
            </td>

            <td>
              {projectedChurn}%
            </td>

          </tr>

          <tr>

            <td>
              Business Health
            </td>

            <td>
              72/100
            </td>

            <td>
              88/100
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}