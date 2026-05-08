export default function RecommendationEngine() {

  const recommendations = [

    {
      priority: "Critical",
      action:
        "Retain high-risk customers"
    },

    {
      priority: "High",
      action:
        "Increase VIP engagement"
    },

    {
      priority: "Medium",
      action:
        "Improve loyalty rewards"
    },

    {
      priority: "Low",
      action:
        "Monitor customer stability"
    }

  ];

  return (

    <div className="table-card">

      <h2
        className="chart-title"
        style={{
          marginBottom: "20px"
        }}
      >
        AI Recommendation Engine
      </h2>

      <table>

        <thead>

          <tr>

            <th>
              Priority
            </th>

            <th>
              Recommendation
            </th>

          </tr>

        </thead>

        <tbody>

          {
            recommendations.map(

              (
                item,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {item.priority}
                  </td>

                  <td>
                    {item.action}
                  </td>

                </tr>

              )

            )
          }

        </tbody>

      </table>

    </div>

  );

}