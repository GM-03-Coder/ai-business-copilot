import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function RevenueChart({
  data,
}) {

  return (

    <ResponsiveContainer
      width="100%"
      height={420}
    >

      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >

        {/* GRID */}

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1e293b"
        />

        {/* X AXIS */}

        <XAxis
          dataKey="month"
          stroke="#94a3b8"
          tick={{
            fontSize: 12,
          }}
        />

        {/* LEFT Y */}

        <YAxis
          yAxisId="left"
          stroke="#00E5FF"
          width={80}
          tickFormatter={(value) =>
            `₹${(value / 1000000).toFixed(0)}M`
          }
        />

        {/* RIGHT Y */}

        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#00ff88"
          width={60}
          tickFormatter={(value) =>
            `${(value / 1000).toFixed(1)}K`
          }
        />

        {/* TOOLTIP */}

        <Tooltip
          contentStyle={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            color: "white",
          }}
        />

        {/* LEGEND */}

        <Legend />

        {/* REVENUE */}

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#00E5FF"
          strokeWidth={4}
          dot={false}
          activeDot={{
            r: 7,
          }}
          name="Revenue"
        />

        {/* CUSTOMERS */}

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="customers"
          stroke="#39ff14"
          strokeWidth={4}
          dot={false}
          activeDot={{
            r: 7,
          }}
          name="Customers"
        />

        {/* PROFIT */}

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="profit"
          stroke="#ff9800"
          strokeWidth={4}
          dot={false}
          activeDot={{
            r: 7,
          }}
          name="Profit"
        />

      </LineChart>

    </ResponsiveContainer>
  );
}