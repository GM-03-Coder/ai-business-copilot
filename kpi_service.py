import pandas as pd


def get_kpis(df):

    # =========================
    # COPY DATA
    # =========================

    df = df.copy()

    # =========================
    # CLEAN DATA
    # =========================

    df = df.dropna(
        subset=["CustomerID"]
    )

    df["CustomerID"] = (
        df["CustomerID"]
        .astype(str)
        .str.replace(".0", "", regex=False)
        .str.strip()
    )

    df["InvoiceDate"] = pd.to_datetime(
        df["InvoiceDate"],
        errors="coerce"
    )

    # =========================
    # TOTAL PRICE
    # =========================

    df["TotalPrice"] = (
        df["Quantity"] *
        df["UnitPrice"]
    )

    # =========================
    # KPI CALCULATIONS
    # =========================

    total_revenue = (
        df["TotalPrice"]
        .sum()
    )

    total_profit = (
        total_revenue * 0.15
    )

    total_customers = (
        df["CustomerID"]
        .nunique()
    )

    total_orders = (
        df["InvoiceNo"]
        .nunique()
    )

    avg_order_value = (
        total_revenue / total_orders
    )

    # SIMPLE RETENTION LOGIC

    repeat_customers = (
        df.groupby("CustomerID")
        ["InvoiceNo"]
        .nunique()
    )

    retained = (
        repeat_customers[
            repeat_customers > 1
        ]
        .count()
    )

    retention_rate = (
        retained / total_customers
    ) * 100

    # =========================
    # RETURN
    # =========================

    return {

        "revenue":
        round(total_revenue, 2),

        "profit":
        round(total_profit, 2),

        "customers":
        int(total_customers),

        "orders":
        int(total_orders),

        "aov":
        round(avg_order_value, 2),

        "retention":
        round(retention_rate, 2)

    }