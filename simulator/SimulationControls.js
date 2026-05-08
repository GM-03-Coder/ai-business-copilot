export default function SimulationControls({

  retentionRate,
  setRetentionRate,

  marketingBudget,
  setMarketingBudget,

  loyaltyBudget,
  setLoyaltyBudget

}) {

  return (

    <div className="chart-card">

      <h2 className="chart-title">
        Simulation Controls
      </h2>

      {/* RETENTION */}

      <div style={{ marginTop: "25px" }}>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between"
          }}
        >

          <span>
            Retention Rate
          </span>

          <span>
            {retentionRate}%
          </span>

        </div>

        <input
          type="range"
          min="50"
          max="100"
          value={retentionRate}
          onChange={(e) =>
            setRetentionRate(
              Number(
                e.target.value
              )
            )
          }
          style={{
            width: "100%",
            marginTop: "10px"
          }}
        />

      </div>

      {/* MARKETING */}

      <div style={{ marginTop: "30px" }}>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between"
          }}
        >

          <span>
            Marketing Budget
          </span>

          <span>
            ₹{marketingBudget}K
          </span>

        </div>

        <input
          type="range"
          min="10"
          max="500"
          value={marketingBudget}
          onChange={(e) =>
            setMarketingBudget(
              Number(
                e.target.value
              )
            )
          }
          style={{
            width: "100%",
            marginTop: "10px"
          }}
        />

      </div>

      {/* LOYALTY */}

      <div style={{ marginTop: "30px" }}>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between"
          }}
        >

          <span>
            Loyalty Budget
          </span>

          <span>
            ₹{loyaltyBudget}K
          </span>

        </div>

        <input
          type="range"
          min="10"
          max="300"
          value={loyaltyBudget}
          onChange={(e) =>
            setLoyaltyBudget(
              Number(
                e.target.value
              )
            )
          }
          style={{
            width: "100%",
            marginTop: "10px"
          }}
        />

      </div>

      {/* =====================================
          STRATEGY TEMPLATES
      ===================================== */}

      <div
        style={{
          marginTop: "35px"
        }}
      >

        <h3
          style={{
            marginBottom: "15px",
            fontSize: "15px",
            color: "#fff"
          }}
        >
          Quick Strategy Templates
        </h3>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >

          {/* AGGRESSIVE */}

          <button
            className="filter-btn"
            onClick={() => {

              setRetentionRate(
                92
              );

              setMarketingBudget(
                320
              );

              setLoyaltyBudget(
                180
              );

            }}
          >
            Aggressive Growth
          </button>

          {/* SAFE */}

          <button
            className="filter-btn"
            onClick={() => {

              setRetentionRate(
                88
              );

              setMarketingBudget(
                140
              );

              setLoyaltyBudget(
                120
              );

            }}
          >
            Safe Retention
          </button>

          {/* COST */}

          <button
            className="filter-btn"
            onClick={() => {

              setRetentionRate(
                75
              );

              setMarketingBudget(
                70
              );

              setLoyaltyBudget(
                40
              );

            }}
          >
            Cost Optimization
          </button>

        </div>

      </div>

      {/* =====================================
          QUICK AI INSIGHT
      ===================================== */}

      <div
        className="insight-card"
        style={{
          marginTop: "25px"
        }}
      >

        <strong>
          AI Strategy Insight
        </strong>

        <p>

          Higher retention and loyalty
          investment currently produce
          strongest business growth
          simulation outcomes.

        </p>

      </div>

    </div>

  );

}