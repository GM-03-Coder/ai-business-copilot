import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function ChurnTrendChart({
  timeframe
}) {

  const allData = [

    { month: "Jan", churn: 4.1 },
    { month: "Feb", churn: 4.8 },
    { month: "Mar", churn: 5.2 },
    { month: "Apr", churn: 5.9 },
    { month: "May", churn: 6.4 },
    { month: "Jun", churn: 8.1 },
    { month: "Jul", churn: 7.5 },
    { month: "Aug", churn: 6.9 },
    { month: "Sep", churn: 6.1 },
    { month: "Oct", churn: 5.6 },
    { month: "Nov", churn: 5.1 },
    { month: "Dec", churn: 4.4 }

  ];

  let filteredData = allData;

  if (timeframe === "6M") {

    filteredData =
      allData.slice(-6);

  }

  else if (
    timeframe === "1Y"
  ) {

    filteredData =
      allData;

  }

  else if (
  timeframe === "3Y"
) {

  filteredData = [

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2022"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2023"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2024"
      })
    )

  ];

}

else if (
  timeframe === "ALL"
) {

  filteredData = [

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2020"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2021"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2022"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2023"
      })
    ),

    ...allData.map(
      item => ({
        ...item,
        month:
          item.month + " 2024"
      })
    )

  ];

}

  return (

    <div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart
          data={filteredData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="churn"
            stroke="#00E5FF"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

      {/* WRITTEN DATA */}

      <table
        style={{
          marginTop: "25px"
        }}
      >

        <thead>

          <tr>

            <th>
              Month
            </th>

            <th>
              Churn Risk
            </th>

          </tr>

        </thead>

        <tbody>

          {
            filteredData.map(

              (
                item,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {item.month}
                  </td>

                  <td>
                    {item.churn}%
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