export default function AIRecommendationTable({
  highRisk
}) {

  const data = [

    {
      problem:
        "High churn customers",
      action:
        "Launch retention campaigns",
      priority:
        "Critical"
    },

    {
      problem:
        "VIP inactivity",
      action:
        "Send premium loyalty offers",
      priority:
        "High"
    },

    {
      problem:
        "Revenue risk",
      action:
        "Increase engagement strategy",
      priority:
        "High"
    },

    {
      problem:
        "Customer drop probability",
      action:
        "Run reactivation workflow",
      priority:
        "Medium"
    }

  ];

  return (

    <table>

      <thead>

        <tr>

          <th>
            Problem
          </th>

          <th>
            AI Recommendation
          </th>

          <th>
            Priority
          </th>

        </tr>

      </thead>

      <tbody>

        {
          data.map(
            (
              item,
              index
            ) => (

              <tr key={index}>

                <td>
                  {item.problem}
                </td>

                <td>
                  {item.action}
                </td>

                <td>
                  {item.priority}
                </td>

              </tr>

            )
          )
        }

      </tbody>

    </table>

  );

}