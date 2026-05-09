import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function PredictionChart({ history, forecast }) {
  if (!history.length) return <p>No prediction data</p>;

  const combined = [
    ...history.map(d => ({ ...d, type: "History" })),
    ...forecast.map(d => ({ ...d, type: "Forecast" }))
  ];

  return (
    <div>
      <h3>📊 Revenue Forecast</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={combined}>
          <CartesianGrid stroke="#222" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />

          {/* HISTORY */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00C49F"
            strokeWidth={3}
            dot={false}
          />

          {/* FORECAST */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FFBB28"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}