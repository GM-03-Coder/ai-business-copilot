import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";

export default function ForecastChart({
  data
}) {

  return (

    <div className="chart-card">

      <h2 className="chart-title">
        Future Forecast
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid
            stroke="#1e293b"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
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

            <th>Month</th>

            <th>Revenue</th>

          </tr>

        </thead>

        <tbody>

          {
            data.map(
              (item, index) => (

                <tr key={index}>

                  <td>
                    {item.month}
                  </td>

                  <td>
                    ₹{item.revenue}M
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