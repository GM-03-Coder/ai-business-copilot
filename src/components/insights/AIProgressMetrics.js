export default function AIProgressMetrics({
  accuracy,
  businessHealth
}) {

  return (

    <div className="small-card">

      <h2 className="chart-title">
        AI Progress Metrics
      </h2>

      {/* AI CONFIDENCE */}

      <div
        style={{
          marginTop: "20px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "8px"
          }}
        >

          <span>
            Prediction Confidence
          </span>

          <span>
            {accuracy}%
          </span>

        </div>

        <div className="progress">

          <div
            className="progress-bar"
            style={{
              width: `${accuracy}%`
            }}
          />

        </div>

      </div>

      {/* HEALTH */}

      <div
        style={{
          marginTop: "22px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "8px"
          }}
        >

          <span>
            Business Stability
          </span>

          <span>
            {businessHealth}%
          </span>

        </div>

        <div className="progress">

          <div
            className="progress-bar"
            style={{
              width:
                `${businessHealth}%`
            }}
          />

        </div>

      </div>

      {/* RETENTION */}

      <div
        style={{
          marginTop: "22px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "8px"
          }}
        >

          <span>
            Retention Strength
          </span>

          <span>
            91%
          </span>

        </div>

        <div className="progress">

          <div
            className="progress-bar"
            style={{
              width: "91%"
            }}
          />

        </div>

      </div>

    </div>

  );

}