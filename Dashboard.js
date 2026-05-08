import Layout from "../layout/Layout";

import StatCard from "../components/cards/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import SegmentChart from "../components/charts/SegmentChart";

import { useEffect, useState } from "react";

import axios from "axios";

export default function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [allData, setAllData] =
    useState([]);

  const [kpis, setKpis] =
    useState(null);

  const [segments, setSegments] =
    useState([]);

  const [timeframe, setTimeframe] =
    useState("6M");

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    // =====================================
    // CHECK CACHE
    // =====================================

    const cachedDashboard =
      localStorage.getItem(
        "dashboard_data"
      );

    if (cachedDashboard) {

      const parsedData =
        JSON.parse(cachedDashboard);

      setAllData(
        parsedData.trends
      );

      setKpis(
        parsedData.kpis
      );

      setSegments(
        parsedData.segments
      );

      return;
    }

    // =====================================
    // FETCH API
    // =====================================

    const fetchData = async () => {

      try {

        const [
          trendsResponse,
          kpiResponse,
          segmentResponse
        ] = await Promise.all([

          axios.get(
            "http://127.0.0.1:8000/trends"
          ),

          axios.get(
            "http://127.0.0.1:8000/kpis"
          ),

          axios.get(
            "http://127.0.0.1:8000/segments"
          )

        ]);

        // =====================================
        // SET STATES
        // =====================================

        setAllData(
          trendsResponse.data
        );

        setKpis(
          kpiResponse.data
        );

        setSegments(
          segmentResponse.data
        );

        // =====================================
        // SAVE CACHE
        // =====================================

        localStorage.setItem(
          "dashboard_data",

          JSON.stringify({

            trends:
              trendsResponse.data,

            kpis:
              kpiResponse.data,

            segments:
              segmentResponse.data

          })
        );

      }

      catch (error) {

        console.error(
          "Dashboard Error:",
          error
        );

      }

    };

    fetchData();

  }, []);

  // =====================================
  // FILTER DATA
  // =====================================

  const getFilteredData = () => {

    if (!allData.length)
      return [];

    if (timeframe === "6M") {

      return allData.slice(-6);

    }

    if (timeframe === "1Y") {

      return allData.slice(-12);

    }

    if (timeframe === "3Y") {

      return allData.slice(-36);

    }

    return allData;

  };

  // =====================================
  // FORMAT MONEY
  // =====================================

  const formatMoney = (num) => {

    if (!num) return "₹0";

    if (num >= 1000000000) {

      return `₹${(
        num / 1000000000
      ).toFixed(1)}B`;

    }

    if (num >= 1000000) {

      return `₹${(
        num / 1000000
      ).toFixed(1)}M`;

    }

    return `₹${num}`;

  };

  // =====================================
  // UI
  // =====================================

  return (

    <Layout>

      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >

        <h1 className="page-title">
          Welcome Back 👋
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "6px",
          }}
        >
          Complete business performance overview
        </p>

      </div>

      {/* KPI */}

      <div className="kpi-grid">

        <StatCard
          title="Revenue"
          value={
            kpis
              ? formatMoney(
                  kpis.revenue
                )
              : "Loading..."
          }
          change="+12.5%"
          color="#00E5FF"
        />

        <StatCard
          title="Profit"
          value={
            kpis
              ? formatMoney(
                  kpis.profit
                )
              : "Loading..."
          }
          change="+8.2%"
          color="#39FF14"
        />

        <StatCard
          title="Customers"
          value={
            kpis
              ? kpis.customers
                  .toLocaleString()
              : "Loading..."
          }
          change="+18.1%"
          color="#FF9800"
        />

        <StatCard
          title="Retention"
          value={
            kpis
              ? `${kpis.retention}%`
              : "Loading..."
          }
          change="+5.4%"
          color="#8B5CF6"
        />

      </div>

      {/* MAIN */}

      <div className="dashboard-grid">

        {/* LEFT */}

        <div>

          {/* BUSINESS GROWTH */}

          <div className="chart-card">

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >

              <div>

                <h2 className="chart-title">
                  Business Growth
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  Revenue, customer and
                  profit trends
                </p>

              </div>

              {/* FILTER */}

              <div className="filter-container">

                <button
                  className={
                    timeframe === "6M"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setTimeframe("6M")
                  }
                >
                  6M
                </button>

                <button
                  className={
                    timeframe === "1Y"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setTimeframe("1Y")
                  }
                >
                  1Y
                </button>

                <button
                  className={
                    timeframe === "3Y"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setTimeframe("3Y")
                  }
                >
                  3Y
                </button>

                <button
                  className={
                    timeframe === "ALL"
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() =>
                    setTimeframe("ALL")
                  }
                >
                  Lifetime
                </button>

              </div>

            </div>

            <RevenueChart
              data={
                getFilteredData()
              }
            />

          </div>

          {/* SEGMENTS */}

          <div
            className="chart-card"
            style={{
              marginTop: "25px"
            }}
          >

            <h2 className="chart-title">
              Customer Segments
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px",
              }}
            >
              AI-powered customer
              segmentation analysis
            </p>

            <SegmentChart
              segments={segments}
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="side-column">

          {/* HEALTH */}

          <div className="small-card">

            <h2 className="chart-title">
              Business Health
            </h2>

            <div className="health-score">
              92/100
            </div>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "18px",
              }}
            >
              AI evaluated overall
              business performance
            </p>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "92%",
                }}
              />

            </div>

          </div>

          {/* QUICK STATS */}

          <div className="small-card">

            <h2 className="chart-title">
              Quick Stats
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginTop: "20px",
              }}
            >

              <div className="insight-card">

                <strong>
                  Total Orders
                </strong>

                <p>
                  {
                    kpis
                    ? kpis.orders
                        ?.toLocaleString()
                    : "Loading..."
                  }
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  Avg Order Value
                </strong>

                <p>
                  {
                    kpis
                    ? `₹${kpis.aov}`
                    : "Loading..."
                  }
                </p>

              </div>

            </div>

          </div>

          {/* AI INSIGHTS */}

          <div className="small-card">

            <h2 className="chart-title">
              AI Insights
            </h2>

            <div className="insight-card">

              <strong>
                Revenue Growth
              </strong>

              <p>
                Revenue performance
                showing strong growth
                trend over time.
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Customer Retention
              </strong>

              <p>
                Customer loyalty
                remains highly stable.
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Segment Intelligence
              </strong>

              <p>
                Loyal and regular
                customers dominate
                business revenue.
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}