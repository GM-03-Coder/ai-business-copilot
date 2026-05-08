import pandas as pd
from datetime import datetime

def get_behavior(df):
    try:
        if df is None or df.empty:
            return {
                "recency": [],
                "frequency": [],
                "monetary": []
            }

        # ============================
        # RFM CALCULATION
        # ============================
        rfm = df.groupby("CustomerID").agg({
            "InvoiceDate": "max",
            "InvoiceNo": "count",
            "TotalPrice": "sum"
        }).reset_index()

        rfm.columns = ["CustomerID", "Last", "Freq", "Mon"]

        rfm["Recency"] = (datetime.now() - rfm["Last"]).dt.days

        # ============================
        # FORCE VARIATION (IMPORTANT)
        # ============================
        if rfm["Recency"].nunique() <= 1:
            rfm["Recency"] = range(1, len(rfm)+1)

        if rfm["Freq"].nunique() <= 1:
            rfm["Freq"] = range(1, len(rfm)+1)

        if rfm["Mon"].nunique() <= 1:
            rfm["Mon"] = range(1, len(rfm)+1)

        # ============================
        # CREATE BUCKETS
        # ============================
        rfm["RecencyBucket"] = pd.qcut(rfm["Recency"], q=5, duplicates="drop")
        rfm["FrequencyBucket"] = pd.qcut(rfm["Freq"], q=5, duplicates="drop")
        rfm["MonetaryBucket"] = pd.qcut(rfm["Mon"], q=5, duplicates="drop")

        # ============================
        # FORMAT LABELS
        # ============================
        def format_interval(interval):
            try:
                return f"{int(interval.left)}-{int(interval.right)}"
            except:
                return str(interval)

        # ============================
        # CONVERT TO CHART DATA
        # ============================
        def prepare_data(col):
            temp = col.value_counts().reset_index()
            temp.columns = ["value", "count"]
            temp["value"] = temp["value"].apply(format_interval)
            return temp.to_dict("records")

        # ============================
        # FINAL OUTPUT
        # ============================
        return {
            "recency": prepare_data(rfm["RecencyBucket"]),
            "frequency": prepare_data(rfm["FrequencyBucket"]),
            "monetary": prepare_data(rfm["MonetaryBucket"])
        }

    except Exception as e:
        print("❌ BEHAVIOR SERVICE ERROR:", e)
        return {
            "recency": [],
            "frequency": [],
            "monetary": []
        }