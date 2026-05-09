import { useMemo, useState } from "react";

import Layout from "../layout/Layout";

import SimulationControls from "../components/simulator/SimulationControls";

import SimulationKPIs from "../components/simulator/SimulationKPIs";

import ForecastChart from "../components/simulator/ForecastChart";

import ROIAnalysis from "../components/simulator/ROIAnalysis";

import RiskImpact from "../components/simulator/RiskImpact";

import StrategyRecommendation from "../components/simulator/StrategyRecommendation";

import FutureProjection from "../components/simulator/FutureProjection";

import ScenarioComparison from "../components/simulator/ScenarioComparison";

import BeforeAfterComparison from "../components/simulator/BeforeAfterComparison";

import SuccessProbability from "../components/simulator/SuccessProbability";

import SimulationRiskMeter from "../components/simulator/SimulationRiskMeter";

import OptimizationInsights from "../components/simulator/OptimizationInsights";

export default function SimulatorPage() {

  // =====================================
  // STATES
  // =====================================

  const [

    retentionRate,

    setRetentionRate

  ] = useState(80);

  const [

    marketingBudget,

    setMarketingBudget

  ] = useState(120);

  const [

    loyaltyBudget,

    setLoyaltyBudget

  ] = useState(60);

  // =====================================
  // CALCULATIONS
  // =====================================

  const projectedRevenue =
    useMemo(() => {

      return Math.round(

        120
        +
        retentionRate * 0.7
        +
        marketingBudget * 0.25
        +
        loyaltyBudget * 0.18

      );

    }, [

      retentionRate,
      marketingBudget,
      loyaltyBudget

    ]);

  const projectedHealth =
    useMemo(() => {

      return Math.min(

        98,

        Math.round(

          retentionRate * 0.7
          +
          loyaltyBudget * 0.08

        )

      );

    }, [

      retentionRate,
      loyaltyBudget

    ]);

  const projectedChurn =
    useMemo(() => {

      return Math.max(

        2,

        (
          25
          -
          retentionRate * 0.18
          -
          loyaltyBudget * 0.03
        ).toFixed(1)

      );

    }, [

      retentionRate,
      loyaltyBudget

    ]);

  const roi =
    useMemo(() => {

      return Math.round(

        (
          projectedRevenue /
          (
            marketingBudget
            +
            loyaltyBudget
          )
        ) * 100

      );

    }, [

      projectedRevenue,
      marketingBudget,
      loyaltyBudget

    ]);

  // =====================================
  // FORECAST DATA
  // =====================================

  const forecastData = [

    {
      month: "Jan",
      revenue:
        projectedRevenue - 25
    },

    {
      month: "Feb",
      revenue:
        projectedRevenue - 18
    },

    {
      month: "Mar",
      revenue:
        projectedRevenue - 12
    },

    {
      month: "Apr",
      revenue:
        projectedRevenue - 5
    },

    {
      month: "May",
      revenue:
        projectedRevenue + 3
    },

    {
      month: "Jun",
      revenue:
        projectedRevenue + 8
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
          AI Strategy Simulator
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "8px"
          }}
        >
          Simulate retention, marketing,
          growth and future business outcomes
          using AI-powered strategy modeling
        </p>

      </div>

      {/* KPI */}

      <SimulationKPIs

        projectedRevenue={
          projectedRevenue
        }

        projectedHealth={
          projectedHealth
        }

        projectedChurn={
          projectedChurn
        }

        roi={roi}

      />

      {/* MAIN GRID */}

      <div className="dashboard-grid">

        {/* LEFT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          {/* CONTROLS */}

          <SimulationControls

            retentionRate={
              retentionRate
            }

            setRetentionRate={
              setRetentionRate
            }

            marketingBudget={
              marketingBudget
            }

            setMarketingBudget={
              setMarketingBudget
            }

            loyaltyBudget={
              loyaltyBudget
            }

            setLoyaltyBudget={
              setLoyaltyBudget
            }

          />


          

          {/* FORECAST */}

          <ForecastChart
            data={forecastData}
          />

          {/* SCENARIO */}

          <ScenarioComparison

            projectedRevenue={
              projectedRevenue
            }

            projectedChurn={
              projectedChurn
            }

          />

          {/* BEFORE AFTER */}

          <BeforeAfterComparison

            projectedRevenue={
              projectedRevenue
            }

            projectedChurn={
              projectedChurn
            }

          />

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          {/* ROI */}

          <ROIAnalysis
            roi={roi}
          />

          {/* SUCCESS */}

          <SuccessProbability
            roi={roi}
          />

          {/* RISK */}

          <RiskImpact
            projectedChurn={
              projectedChurn
            }
          />

          {/* RISK METER */}

          <SimulationRiskMeter
            projectedChurn={
              projectedChurn
            }
          />

          {/* STRATEGY */}

          <StrategyRecommendation

            retentionRate={
              retentionRate
            }

            marketingBudget={
              marketingBudget
            }

          />

          {/* FUTURE */}

          <FutureProjection

            projectedRevenue={
              projectedRevenue
            }

          />

          {/* OPTIMIZATION */}

          <OptimizationInsights

            retentionRate={
              retentionRate
            }

            marketingBudget={
              marketingBudget
            }

          />

          {/* EXECUTIVE */}

          <div className="small-card">

            <h2 className="chart-title">
              AI Executive Simulation Summary
            </h2>

            <div className="insight-card">

              <p>

                AI predicts improved
                business growth with
                higher retention and
                optimized marketing
                investment strategy.

              </p>

            </div>

            <div className="insight-card">

              <strong>
                Simulation Insight
              </strong>

              <p>

                Customer churn may reduce
                significantly if loyalty
                investment increases.

              </p>

            </div>

          </div>

          {/* AI DECISION */}

          <div className="small-card">

            <h2 className="chart-title">
              AI Decision Support
            </h2>

            <div className="insight-card">

              <strong>
                Recommended Action
              </strong>

              <p>

                Increase retention rate
                above 85% for long-term
                customer stability.

              </p>

            </div>

            <div className="insight-card">

              <strong>
                Revenue Optimization
              </strong>

              <p>

                Balanced marketing and
                loyalty investment produces
                highest ROI efficiency.

              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}