export default function ScenarioComparison({

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
        Scenario Comparison
      </h2>

      <table>

        <thead>

          <tr>

            <th>
              Scenario
            </th>

            <th>
              Revenue
            </th>

            <th>
              Churn
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>
              Current
            </td>

            <td>
              ₹{projectedRevenue - 10}M
            </td>

            <td>
              {projectedChurn + 2}%
            </td>

          </tr>

          <tr>

            <td>
              Optimized
            </td>

            <td>
              ₹{projectedRevenue}M
            </td>

            <td>
              {projectedChurn}%
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}