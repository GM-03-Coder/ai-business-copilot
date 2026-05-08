export default function StatCard({
  title,
  value,
  change,
  color
}) {

  return (

    <div
      className="stat-card"
      style={{
        borderTop: `4px solid ${color}`
      }}
    >

      <div className="stat-title">
        {title}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-change">
        {change}
      </div>

    </div>
  );
}