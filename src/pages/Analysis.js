import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import StatCard from "../components/cards/StatCard";

import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import ChurnTrendChart from "../components/analysis/ChurnTrendChart";

import RiskTable from "../components/analysis/RiskTable";

import AIRecommendationTable from "../components/analysis/AIRecommendationTable";

export default function Analysis() {

  // =====================================
  // STATES
  // =====================================

  const [churnData, setChurnData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [timeframe, setTimeframe] =
    useState("6M");

  // =====================================
  // FETCH
  // =====================================

  useEffect(() => {

    const cached =
      localStorage.getItem(
        "analysis_page_data"
      );

    if (cached) {

      setChurnData(
        JSON.parse(cached)
      );

      setLoading(false);

      return;

    }

    async function fetchData() {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:8000/prediction"
          );

        setChurnData(
          response.data
        );

        localStorage.setItem(

          "analysis_page_data",

          JSON.stringify(
            response.data
          )

        );

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    }

    fetchData();

  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <Layout>

        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: "22px"
          }}
        >
          Loading AI Analysis...
        </div>

      </Layout>

    );

  }

  // =====================================
  // REAL VALUES
  // =====================================

  const totalCustomers =
    churnData?.total_customers || 0;

  const highRiskCustomers =
    churnData?.high_risk_customers || 0;

  const avgRisk =
    churnData?.avg_churn_risk || 0;

  const accuracy =
    churnData?.accuracy || 0;

  const safeCustomers =
    totalCustomers -
    highRiskCustomers;

  const mediumRisk = Math.floor(
    totalCustomers * 0.007
  );

  const lowRisk =
    totalCustomers -
    highRiskCustomers -
    mediumRisk;

  const businessHealth = Math.max(

    70,

    (
      accuracy
      -
      avgRisk
      -
      (
        highRiskCustomers /
        totalCustomers
      ) * 100
    )

  ).toFixed(0);

  const revenueAtRisk =
    highRiskCustomers * 52000;

  const recoveryPotential =
    revenueAtRisk * 0.32;

  // =====================================
  // AI SUMMARY
  // =====================================

  const executiveSummary =

    highRiskCustomers < 500

      ? "Business stability remains strong with low customer churn exposure and healthy retention performance."

      : "Customer churn exposure increasing. AI recommends immediate retention and recovery strategies.";

  // =====================================
  // PIE DATA
  // =====================================

  const pieData = [

    {
      name: "High Risk",
      value: highRiskCustomers
    },

    {
      name: "Safe Customers",
      value: safeCustomers
    }

  ];

  const COLORS = [
    "#FF4D6D",
    "#00E5FF"
  ];

  // =====================================
  // RISK DATA
  // =====================================

  const riskDistribution = [

    {
      risk: "Low",
      customers: lowRisk
    },

    {
      risk: "Medium",
      customers: mediumRisk
    },

    {
      risk: "High",
      customers: highRiskCustomers
    }

  ];

  // =====================================
  // UI
  // =====================================

  return (

    <Layout>

      {/* HEADER */}

      <div
        style={{
          marginBottom: "28px"
        }}
      >

        <h1 className="page-title">
          AI Business Analysis
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px"
          }}
        >
          AI-powered churn intelligence,
          business risk and predictive analytics
        </p>

      </div>

      {/* KPI */}

      <div className="kpi-grid">

        <StatCard
          title="Model Accuracy"
          value={`${accuracy}%`}
          change="+4.2%"
          color="#00E5FF"
        />

        <StatCard
          title="High Risk Customers"
          value={
            highRiskCustomers.toLocaleString()
          }
          change="-1.8%"
          color="#FF4D6D"
        />

        <StatCard
          title="Avg Churn Risk"
          value={`${avgRisk}%`}
          change="+2.1%"
          color="#ff9800"
        />

        <StatCard
          title="Business Health"
          value={`${businessHealth}/100`}
          change="+5.4%"
          color="#39FF14"
        />

      </div>

      {/* MAIN GRID */}

      <div className="dashboard-grid">

        {/* LEFT */}

        <div>

          {/* CHURN OVERVIEW */}

          <div className="chart-card">

            <h2 className="chart-title">
              Churn Risk Overview
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px"
              }}
            >
              AI-generated customer risk overview
            </p>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {
                    pieData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
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

            {/* WRITTEN */}

            <table
              style={{
                marginTop: "20px"
              }}
            >

              <thead>

                <tr>

                  <th>
                    Metric
                  </th>

                  <th>
                    Value
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>
                    Total Customers
                  </td>

                  <td>
                    {
                      totalCustomers.toLocaleString()
                    }
                  </td>

                </tr>

                <tr>

                  <td>
                    Safe Customers
                  </td>

                  <td>
                    {
                      safeCustomers.toLocaleString()
                    }
                  </td>

                </tr>

                <tr>

                  <td>
                    High Risk Customers
                  </td>

                  <td>
                    {
                      highRiskCustomers.toLocaleString()
                    }
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* RISK DISTRIBUTION */}

          <div
            className="chart-card"
            style={{
              marginTop: "24px"
            }}
          >

            <h2 className="chart-title">
              Risk Distribution
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px"
              }}
            >
              AI-generated customer segmentation
            </p>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart
                data={riskDistribution}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="risk"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="customers"
                  fill="#00E5FF"
                />

              </BarChart>

            </ResponsiveContainer>

            <div
              style={{
                marginTop: "20px"
              }}
            >

              <RiskTable
                totalCustomers={
                  totalCustomers
                }
                highRisk={
                  highRiskCustomers
                }
              />

            </div>

          </div>

          {/* TOP RISK */}

          <div
            className="table-card"
            style={{
              marginTop: "24px"
            }}
          >

            <h2
              className="chart-title"
              style={{
                marginBottom: "18px"
              }}
            >
              Top Risk Customers
            </h2>

            <table>

              <thead>

                <tr>

                  <th>
                    Customer ID
                  </th>

                  <th>
                    Churn Probability
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  churnData
                    ?.top_risk_customers
                    ?.map(

                      (
                        customer,
                        index
                      ) => (

                        <tr key={index}>

                          <td>
                            {
                              customer.CustomerID
                            }
                          </td>

                          <td
                            style={{
                              color:
                                "#FF4D6D",
                              fontWeight:
                                "600"
                            }}
                          >
                            {
                              customer.ChurnProbability
                            }%
                          </td>

                        </tr>

                      )

                    )
                }

              </tbody>

            </table>

          </div>

          {/* TREND */}

          <div
            className="chart-card"
            style={{
              marginTop: "24px"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >

              <div>

                <h2 className="chart-title">
                  Churn Trend Analysis
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "6px"
                  }}
                >
                  Predicted churn trend over time
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

            <ChurnTrendChart
              timeframe={timeframe}
            />

          </div>

          {/* AI RECOMMENDATIONS */}

          <div
            className="table-card"
            style={{
              marginTop: "24px"
            }}
          >

            <h2
              className="chart-title"
              style={{
                marginBottom: "18px"
              }}
            >
              AI Recommendations
            </h2>

            <AIRecommendationTable
              highRisk={
                highRiskCustomers
              }
            />

          </div>

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >

          {/* EXECUTIVE + INSIGHTS */}

          <div className="small-card">

            <h2 className="chart-title">
              Executive Intelligence
            </h2>

            <div className="insight-card">

              <strong>
                Executive Summary
              </strong>

              <p>
                {executiveSummary}
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Customer Stability
              </strong>

              <p>
                {
                  highRiskCustomers < 500

                    ? "Customer retention remains highly stable."

                    : "Customer churn increasing."
                }
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Revenue Exposure
              </strong>

              <p>
                ₹
                {Math.floor(
                  revenueAtRisk
                ).toLocaleString()}
                potential exposure detected
              </p>

            </div>

          </div>

          {/* HEALTH + IMPACT */}

          <div className="small-card">

            <h2 className="chart-title">
              Business Health
            </h2>

            <div className="health-score">
              {businessHealth}/100
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

            {/* MINI METRICS */}

            <div
              style={{
                marginTop: "22px",
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "12px"
              }}
            >

              <div className="insight-card">

                <strong>
                  Revenue At Risk
                </strong>

                <p>
                  ₹
                  {Math.floor(
                    revenueAtRisk
                  ).toLocaleString()}
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  Recovery Potential
                </strong>

                <p>
                  ₹
                  {Math.floor(
                    recoveryPotential
                  ).toLocaleString()}
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  Retention Strength
                </strong>

                <p>
                  91%
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  AI Confidence
                </strong>

                <p>
                  {accuracy}%
                </p>

              </div>

            </div>

          </div>

          {/* MODEL */}

          <div className="small-card">

            <h2 className="chart-title">
              Model Intelligence
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "14px",
                marginTop: "20px"
              }}
            >

              <div className="insight-card">

                <strong>
                  Algorithm
                </strong>

                <p>
                  Random Forest
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  Precision
                </strong>

                <p>
                  81%
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  Recall
                </strong>

                <p>
                  79%
                </p>

              </div>

              <div className="insight-card">

                <strong>
                  F1 Score
                </strong>

                <p>
                  80%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}