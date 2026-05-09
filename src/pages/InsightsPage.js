import { useEffect, useState } from "react";

import Layout from "../layout/Layout";

import axios from "axios";

import StatCard from "../components/cards/StatCard";

import AISummaryCard from "../components/insights/AISummaryCard";

import SmartAlerts from "../components/insights/SmartAlerts";

import OpportunityPanel from "../components/insights/OpportunityPanel";

import DecisionSupport from "../components/insights/DecisionSupport";

import RevenueIntelligence from "../components/insights/RevenueIntelligence";

import AIConfidencePanel from "../components/insights/AIConfidencePanel";

import RecommendationEngine from "../components/insights/RecommendationEngine";

import PredictiveInsights from "../components/insights/PredictiveInsights";

import StrategicActions from "../components/insights/StrategicActions";

import OpportunityScore from "../components/insights/OpportunityScore";

import RiskSeverity from "../components/insights/RiskSeverity";

import BusinessStrength from "../components/insights/BusinessStrength";

import NarrativeInsights from "../components/insights/NarrativeInsights";

import AIPriorityMatrix from "../components/insights/AIPriorityMatrix";

import AITimelineRoadmap from "../components/insights/AITimelineRoadmap";

import AIProgressMetrics from "../components/insights/AIProgressMetrics";

export default function InsightsPage() {

  // =====================================
  // STATES
  // =====================================

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    const cached =
      localStorage.getItem(
        "ai_insights_data"
      );

    if (cached) {

      setData(
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

        setData(
          response.data
        );

        localStorage.setItem(

          "ai_insights_data",

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
          Loading AI Insights...
        </div>

      </Layout>

    );

  }

  // =====================================
  // REAL DATA
  // =====================================

  const totalCustomers =
    data?.total_customers || 0;

  const highRisk =
    data?.high_risk_customers || 0;

  const avgRisk =
    data?.avg_churn_risk || 0;

  const accuracy =
    data?.accuracy || 0;

  // =====================================
  // BUSINESS HEALTH
  // =====================================

  const businessHealth = Math.max(

    70,

    (
      accuracy
      -
      avgRisk
      -
      (
        highRisk /
        totalCustomers
      ) * 100
    )

  ).toFixed(0);

  // =====================================
  // UI
  // =====================================

  return (

    <Layout>

      {/* =====================================
          HEADER
      ===================================== */}

      <div
        style={{
          marginBottom: "28px"
        }}
      >

        <h1 className="page-title">
          AI Insights Engine
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px"
          }}
        >
          AI-generated business intelligence,
          recommendations and strategic insights
        </p>

      </div>

      {/* =====================================
          KPI SECTION
      ===================================== */}

      <div className="kpi-grid">

        <StatCard
          title="Business Health"
          value={`${businessHealth}/100`}
          change="+5.1%"
          color="#39FF14"
        />

        <StatCard
          title="AI Confidence"
          value={`${accuracy}%`}
          change="+3.2%"
          color="#00E5FF"
        />

        <StatCard
          title="High Risk Customers"
          value={
            highRisk.toLocaleString()
          }
          change="-1.4%"
          color="#FF4D6D"
        />

        <StatCard
          title="Avg Churn Risk"
          value={`${avgRisk}%`}
          change="+2.2%"
          color="#ff9800"
        />

      </div>

      {/* =====================================
          MAIN GRID
      ===================================== */}

      <div className="dashboard-grid">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          <AISummaryCard
            highRisk={highRisk}
            businessHealth={businessHealth}
          />

          <RecommendationEngine />

          <RevenueIntelligence
            highRisk={highRisk}
          />

          <PredictiveInsights />

          <StrategicActions
            highRisk={highRisk}
            avgRisk={avgRisk}
          />

          <BusinessStrength
            highRisk={highRisk}
          />

          <AIPriorityMatrix
            highRisk={highRisk}
          />

        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          <SmartAlerts
            highRisk={highRisk}
          />

          <OpportunityPanel />

          <DecisionSupport />

          <AIConfidencePanel
            accuracy={accuracy}
          />

          <OpportunityScore
            businessHealth={
              Number(businessHealth)
            }
          />

          <RiskSeverity
            avgRisk={avgRisk}
          />

          <NarrativeInsights
            highRisk={highRisk}
            businessHealth={
              Number(businessHealth)
            }
          />

          <AITimelineRoadmap />

          <AIProgressMetrics
            accuracy={accuracy}
            businessHealth={
              Number(businessHealth)
            }
          />

        </div>

      </div>

    </Layout>

  );

}