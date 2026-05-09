import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#00E5FF",
  "#39FF14",
  "#FF9800",
  "#FF4D6D",
  "#8B5CF6"
];

export default function SegmentChart({
  segments = []
}) {

  // =========================
  // NO DATA
  // =========================

  if (
    !Array.isArray(segments) ||
    segments.length === 0
  ) {

    return (

      <div
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#94a3b8",
          fontSize: "18px"
        }}
      >
        No segmentation data
      </div>

    );

  }

  // =========================
  // FORMAT
  // =========================

  const chartData = segments.map(
    (item) => ({

      name:
        item.segment ||
        item.Segment ||
        "Unknown",

      value:
        item.count ||
        item.Count ||
        0

    })
  );

  // =========================
  // UI
  // =========================

  return (

    <div
      style={{
        width: "100%",
        height: "350px"
      }}
    >

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {
              chartData.map(
                (entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}