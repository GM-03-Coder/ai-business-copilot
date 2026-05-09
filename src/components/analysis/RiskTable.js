export default function RiskTable({
  totalCustomers,
  highRisk
}) {

  const mediumRisk = Math.floor(
    totalCustomers * 0.007
  );

  const lowRisk =
    totalCustomers -
    highRisk -
    mediumRisk;

  const data = [

    {
      level: "Low",
      customers: lowRisk
    },

    {
      level: "Medium",
      customers: mediumRisk
    },

    {
      level: "High",
      customers: highRisk
    }

  ];

  return (

    <table>

      <thead>

        <tr>

          <th>
            Risk Level
          </th>

          <th>
            Customers
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
                  {item.level}
                </td>

                <td>
                  {item.customers.toLocaleString()}
                </td>

              </tr>

            )
          )
        }

      </tbody>

    </table>

  );

}