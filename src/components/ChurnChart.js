import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ChurnChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No churn data</p>;
  }

  return (
    <div>
      <h3>📉 Churn vs Prediction</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Recency" />
          <YAxis />
          <Tooltip />

          {/* Predicted */}
          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#00C49F"
            strokeWidth={3}
          />

          {/* Actual */}
          <Line
            type="monotone"
            dataKey="Churn"
            stroke="#FF4C4C"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}