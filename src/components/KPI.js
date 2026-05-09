export default function KPI({ data }) {
  if (!data) return null;

  const items = [
    { label: "Revenue", value: `₹${data.revenue}`, color: "#22c55e" },
    { label: "Customers", value: data.customers, color: "#3b82f6" },
    { label: "AOV", value: `₹${data.aov}`, color: "#facc15" },
    { label: "Profit", value: `₹${data.profit}`, color: "#a855f7" }
  ];

  return (
    <div className="grid-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="card"
          style={{
            borderLeft: `4px solid ${item.color}`
          }}
        >
          <p style={{ color: "#9ca3af" }}>{item.label}</p>
          <h2>{item.value}</h2>
        </div>
      ))}
    </div>
  );
}