import { useEffect, useState } from "react";
import { getBehavior } from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function BehaviorChart() {
  const [recency, setRecency] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [monetary, setMonetary] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBehavior();

        setRecency(res.recency || []);
        setFrequency(res.frequency || []);
        setMonetary(res.monetary || []);
      } catch (err) {
        console.error("Behavior error:", err);
      }
    }

    fetchData();
  }, []);

  const renderChart = (data, color) => (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid stroke="#1e2330" />
        <XAxis dataKey="value" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <h3>👥 Customer Behavior Analysis</h3>

      <p>Recency</p>
      {renderChart(recency, "#22c55e")}

      <p>Frequency</p>
      {renderChart(frequency, "#3b82f6")}

      <p>Monetary</p>
      {renderChart(monetary, "#facc15")}
    </div>
  );
}