export default function AIPriorityMatrix({
  highRisk
}) {

  return (

    <div className="table-card">

      <h2
        className="chart-title"
        style={{
          marginBottom: "18px"
        }}
      >
        AI Priority Matrix
      </h2>

      <table>

        <thead>

          <tr>

            <th>
              Priority
            </th>

            <th>
              Business Area
            </th>

            <th>
              Severity
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td
              style={{
                color: "#FF4D6D",
                fontWeight: "600"
              }}
            >
              Critical
            </td>

            <td>
              High Risk Customers
            </td>

            <td>
              {
                highRisk > 500
                  ? "High"
                  : "Moderate"
              }
            </td>

          </tr>

          <tr>

            <td
              style={{
                color: "#ff9800",
                fontWeight: "600"
              }}
            >
              High
            </td>

            <td>
              VIP Retention
            </td>

            <td>
              Medium
            </td>

          </tr>

          <tr>

            <td
              style={{
                color: "#39FF14",
                fontWeight: "600"
              }}
            >
              Medium
            </td>

            <td>
              Loyalty Rewards
            </td>

            <td>
              Low
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}