# services/prediction_service.py

import pandas as pd
from datetime import timedelta

def get_prediction(df):
    try:
        if df is None or df.empty:
            return {"history": [], "forecast": []}

        # =============================
        # DAILY REVENUE
        # =============================
        df["date"] = df["InvoiceDate"].dt.date

        daily = df.groupby("date")["TotalPrice"].sum().reset_index()
        daily.columns = ["date", "revenue"]

        daily = daily.sort_values("date")

        # =============================
        # LAST 30 DAYS (HISTORY)
        # =============================
        history = daily.tail(30).copy()

        # =============================
        # GROWTH RATE
        # =============================
        history["growth"] = history["revenue"].pct_change()
        growth = history["growth"].mean()

        if pd.isna(growth):
            growth = 0.01  # fallback

        # =============================
        # FORECAST NEXT 30 DAYS
        # =============================
        forecast = []

        last_date = history["date"].iloc[-1]
        last_value = history["revenue"].iloc[-1]

        for i in range(30):
            next_value = last_value * (1 + growth)

            next_date = last_date + timedelta(days=i + 1)

            forecast.append({
                "date": str(next_date),
                "revenue": float(round(next_value, 2))
            })

            last_value = next_value

        return {
            "history": history[["date", "revenue"]].astype(str).to_dict("records"),
            "forecast": forecast
        }

    except Exception as e:
        print("❌ PREDICTION ERROR:", e)
        return {"history": [], "forecast": []}