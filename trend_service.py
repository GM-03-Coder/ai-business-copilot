import pandas as pd

def get_trends(df):

    if df.empty:
        return []

    # MONTH

    df["Month"] = df["InvoiceDate"].dt.strftime("%b")

    # GROUP

    trend = df.groupby("Month").agg({
        "TotalPrice": "sum",
        "CustomerID": "nunique",
        "InvoiceNo": "nunique"
    }).reset_index()

    trend.columns = [
        "month",
        "revenue",
        "customers",
        "profit"
    ]

    # PROFIT ESTIMATION

    trend["profit"] = (
        trend["revenue"] * 0.18
    )

    return trend.to_dict("records")