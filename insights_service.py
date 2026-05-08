from datetime import datetime
import pandas as pd


def get_insights(df):
    try:

        if df is None or df.empty:
            return {
                "health_score": 0,
                "insights": []
            }

        # =============================
        # RFM ANALYSIS
        # =============================
        rfm = df.groupby("CustomerID").agg({
            "InvoiceDate": "max",
            "InvoiceNo": "count",
            "TotalPrice": "sum"
        }).reset_index()

        rfm.columns = [
            "CustomerID",
            "LastPurchase",
            "Frequency",
            "Monetary"
        ]

        today = datetime.now()

        rfm["Recency"] = (
            today - rfm["LastPurchase"]
        ).dt.days

        # =============================
        # NORMALIZATION
        # =============================
        def normalize(col):
            return (
                (col - col.min()) /
                (col.max() - col.min() + 1e-9)
            )

        rfm["R"] = 1 - normalize(rfm["Recency"])
        rfm["F"] = normalize(rfm["Frequency"])
        rfm["M"] = normalize(rfm["Monetary"])

        # =============================
        # HEALTH SCORE
        # =============================
        health_score = (
            0.5 * rfm["R"] +
            0.3 * rfm["F"] +
            0.2 * rfm["M"]
        ).mean() * 100

        health_score = round(float(health_score), 2)

        # =============================
        # AI INSIGHTS
        # =============================
        insights = []

        avg_recency = rfm["Recency"].mean()
        avg_freq = rfm["Frequency"].mean()
        avg_money = rfm["Monetary"].mean()

        if avg_recency > 100:
            insights.append({
                "type": "warning",
                "message": "Customers becoming inactive"
            })

        if avg_freq < 5:
            insights.append({
                "type": "risk",
                "message": "Repeat purchases are low"
            })

        if avg_money > 500:
            insights.append({
                "type": "positive",
                "message": "Strong customer spending detected"
            })

        if health_score > 75:
            insights.append({
                "type": "success",
                "message": "Business health is excellent"
            })

        elif health_score > 50:
            insights.append({
                "type": "neutral",
                "message": "Business is stable with growth opportunity"
            })

        else:
            insights.append({
                "type": "danger",
                "message": "Business health needs attention"
            })

        return {
            "health_score": health_score,
            "insights": insights
        }

    except Exception as e:
        print("❌ INSIGHTS ERROR:", e)

        return {
            "health_score": 0,
            "insights": []
        }