import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import SegmentChart from "../components/charts/SegmentChart";
import BehaviorChart from "../components/BehaviorChart";

import StatCard from "../components/cards/StatCard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import axios from "axios";

export default function Customer() {

  // =====================================
  // STATES
  // =====================================

  const [segments, setSegments] =
    useState([]);

  const [overview, setOverview] =
    useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // FETCH
  // =====================================

  useEffect(() => {

    // CACHE

    const cachedCustomer =
      localStorage.getItem(
        "customer_page_data"
      );

    if (cachedCustomer) {

      const parsed =
        JSON.parse(cachedCustomer);

      setSegments(
        parsed.segments
      );

      setOverview(
        parsed.overview
      );

      setAnalytics(
        parsed.analytics
      );

      setLoading(false);

      return;

    }

    // API

    async function fetchData() {

      try {

        const [

          segmentResponse,

          overviewResponse,

          analyticsResponse

        ] = await Promise.all([

          axios.get(
            "http://127.0.0.1:8000/segments"
          ),

          axios.get(
            "http://127.0.0.1:8000/customer-overview"
          ),

          axios.get(
            "http://127.0.0.1:8000/customer-analytics"
          )

        ]);

        setSegments(
          segmentResponse.data
        );

        setOverview(
          overviewResponse.data
        );

        setAnalytics(
          analyticsResponse.data
        );

        // CACHE SAVE

        localStorage.setItem(

          "customer_page_data",

          JSON.stringify({

            segments:
              segmentResponse.data,

            overview:
              overviewResponse.data,

            analytics:
              analyticsResponse.data

          })

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
          Loading Customer Intelligence...
        </div>

      </Layout>

    );

  }

  // =====================================
  // UI
  // =====================================

  return (

    <Layout>

      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1 className="page-title">
          Customer Intelligence
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "6px"
          }}
        >
          AI-powered customer analytics
          and segmentation intelligence
        </p>

      </div>

      {/* KPI */}

      <div className="kpi-grid">

        <StatCard
          title="Total Customers"
          value={
            overview?.total_customers
              ?.toLocaleString()
          }
          change="+12.4%"
          color="#00E5FF"
        />

        <StatCard
          title="VIP Customers"
          value={
            overview?.vip_customers
              ?.toLocaleString()
          }
          change="+8.1%"
          color="#39FF14"
        />

        <StatCard
          title="At Risk"
          value={
            overview?.at_risk_customers
              ?.toLocaleString()
          }
          change="-2.4%"
          color="#FF4D6D"
        />

        <StatCard
          title="Avg Customer Value"
          value={
            `₹${overview?.avg_customer_value?.toLocaleString()}`
          }
          change="+14.7%"
          color="#8B5CF6"
        />

      </div>

      {/* MAIN */}

      <div className="dashboard-grid">

        {/* LEFT */}

        <div>

          {/* SEGMENTS */}

          <div className="chart-card">

            <h2 className="chart-title">
              Customer Segmentation
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px"
              }}
            >
              AI-powered RFM customer
              segmentation analysis
            </p>

            <SegmentChart
              segments={segments}
            />

          </div>

          {/* SEGMENT TABLE */}

          <div
            className="table-card"
            style={{
              marginTop: "25px"
            }}
          >

            <h2
              className="chart-title"
              style={{
                marginBottom: "20px"
              }}
            >
              Segment Details
            </h2>

            <table>

              <thead>

                <tr>

                  <th>Segment</th>
                  <th>Customers</th>
                  <th>Avg Value</th>
                  <th>Contribution</th>

                </tr>

              </thead>

              <tbody>

                {
                  analytics?.segment_summary
                    ?.map(

                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={index}
                        >

                          <td>
                            {
                              item.segment
                            }
                          </td>

                          <td>
                            {
                              item.customers
                                ?.toLocaleString()
                            }
                          </td>

                          <td>
                            ₹{
                              item.avg_value
                                ?.toLocaleString()
                            }
                          </td>

                          <td
                            style={{
                              color:
                                "#39FF14"
                            }}
                          >
                            {
                              item.contribution
                            }%
                          </td>

                        </tr>

                      )

                    )
                }

              </tbody>

            </table>

          </div>

          {/* CONTRIBUTION GRAPH */}

          <div
            className="chart-card"
            style={{
              marginTop: "25px"
            }}
          >

            <h2 className="chart-title">
              Revenue Contribution
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px"
              }}
            >
              Business contribution by
              customer segments
            </p>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={
                  analytics?.segment_summary
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="segment"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="contribution"
                  fill="#00E5FF"
                  name="Contribution %"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* RFM */}

          <div
            className="chart-card"
            style={{
              marginTop: "25px"
            }}
          >

            <h2 className="chart-title">
              RFM Analytics
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px"
              }}
            >
              Customer recency, frequency
              and monetary analysis
            </p>

            <BehaviorChart />

            {/* RFM SUMMARY */}

            <div
              style={{
                marginTop: "30px"
              }}
            >

              <table>

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
                      Avg Recency
                    </td>

                    <td>
                      {
                        analytics
                          ?.rfm_summary
                          ?.avg_recency
                      } Days
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Avg Frequency
                    </td>

                    <td>
                      {
                        analytics
                          ?.rfm_summary
                          ?.avg_frequency
                      } Orders
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Avg Monetary
                    </td>

                    <td>
                      ₹{
                        analytics
                          ?.rfm_summary
                          ?.avg_monetary
                          ?.toLocaleString()
                      }
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* TOP CUSTOMERS */}

          <div
            className="table-card"
            style={{
              marginTop: "25px"
            }}
          >

            <h2
              className="chart-title"
              style={{
                marginBottom: "20px"
              }}
            >
              Top Customers
            </h2>

            <table>

              <thead>

                <tr>

                  <th>
                    Customer ID
                  </th>

                  <th>
                    Segment
                  </th>

                  <th>
                    Revenue
                  </th>

                  <th>
                    Orders
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  analytics
                    ?.top_customers
                    ?.map(

                      (
                        customer,
                        index
                      ) => (

                        <tr
                          key={index}
                        >

                          <td>
                            {
                              customer.CustomerID
                            }
                          </td>

                          <td>
                            {
                              customer.Segment
                            }
                          </td>

                          <td>
                            ₹{
                              customer.Revenue
                                ?.toLocaleString()
                            }
                          </td>

                          <td>
                            {
                              customer.Frequency
                            }
                          </td>

                        </tr>

                      )

                    )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* RIGHT */}

        <div className="side-column">

          {/* AI INSIGHTS */}

          <div className="small-card">

            <h2 className="chart-title">
              AI Customer Insights
            </h2>

            <div className="insight-card">

              <strong>
                Loyal Customers
              </strong>

              <p>
                Loyal customers contribute
                the highest business revenue.
              </p>

            </div>

            <div className="insight-card">

              <strong>
                VIP Contribution
              </strong>

              <p>
                VIP customers show the
                highest average spending.
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Risk Segments
              </strong>

              <p>
                At Risk and Lost customers
                require retention campaigns.
              </p>

            </div>

          </div>

          {/* CUSTOMER HEALTH */}

          <div className="small-card">

            <h2 className="chart-title">
              Customer Health
            </h2>

            <div className="health-score">
              88/100
            </div>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "18px"
              }}
            >
              Strong customer retention
              and loyalty performance.
            </p>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "88%"
                }}
              />

            </div>

          </div>

          {/* SEGMENT RANKING */}

          <div className="small-card">

            <h2 className="chart-title">
              Segment Ranking
            </h2>

            <div className="insight-card">

              <strong>
                #1 Loyal
              </strong>

              <p>
                34.01% revenue contribution
              </p>

            </div>

            <div className="insight-card">

              <strong>
                #2 Regular
              </strong>

              <p>
                25.84% revenue contribution
              </p>

            </div>

            <div className="insight-card">

              <strong>
                #3 VIP
              </strong>

              <p>
                24.51% revenue contribution
              </p>

            </div>

          </div>

          {/* QUICK METRICS */}

          <div className="small-card">

            <h2 className="chart-title">
              Quick Metrics
            </h2>

            <div className="insight-card">

              <strong>
                Avg Orders
              </strong>

              <p>
                11.65 orders/customer
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Avg Spend
              </strong>

              <p>
                ₹14,732/customer
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Repeat Strength
              </strong>

              <p>
                Very high repeat engagement
              </p>

            </div>

          </div>

          {/* RISK SUMMARY */}

          <div className="small-card">

            <h2 className="chart-title">
              Risk Summary
            </h2>

            <div className="insight-card">

              <strong>
                At Risk
              </strong>

              <p>
                13,363 customers identified
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Lost Customers
              </strong>

              <p>
                9,161 inactive customers
              </p>

            </div>

            <div className="insight-card">

              <strong>
                Retention Stability
              </strong>

              <p>
                Customer loyalty remains stable
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}