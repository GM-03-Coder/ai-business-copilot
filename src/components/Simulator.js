import { useState } from "react";

export default function Simulator() {
  const [discount, setDiscount] = useState(10);

  return (
    <div className="card">
      <h3>⚙️ Strategy Simulator</h3>

      <input
        type="range"
        min="0"
        max="50"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <p>Discount: {discount}%</p>

      <button>Simulate</button>
    </div>
  );
}