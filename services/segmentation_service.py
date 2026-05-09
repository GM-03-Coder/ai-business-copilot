import pandas as pd


def perform_rfm_segmentation(df):

    # ====================================
    # COPY DATA
    # ====================================

    df = df.copy()

    # ====================================
    # CLEAN CUSTOMER IDs
    # ====================================

    df = df.dropna(
        subset=["CustomerID"]
    )

    df["CustomerID"] = (

        df["CustomerID"]

        .astype(str)

        .str.replace(".0", "", regex=False)

        .str.strip()

    )

    # ====================================
    # DATE FORMAT
    # ====================================

    df["InvoiceDate"] = pd.to_datetime(
        df["InvoiceDate"],
        errors="coerce"
    )

    # ====================================
    # TOTAL PRICE
    # ====================================

    df["TotalPrice"] = (
        df["Quantity"] *
        df["UnitPrice"]
    )

    # ====================================
    # UNIQUE CUSTOMERS ONLY
    # ====================================

    unique_customers = (
        df["CustomerID"]
        .drop_duplicates()
    )

    # ====================================
    # SNAPSHOT DATE
    # ====================================

    snapshot_date = (
        df["InvoiceDate"].max()
        + pd.Timedelta(days=1)
    )

    # ====================================
    # RFM TABLE
    # ====================================

    rfm = (
        df.groupby("CustomerID")
        .agg({

            "InvoiceDate": lambda x:
            (
                snapshot_date - x.max()
            ).days,

            "InvoiceNo": "nunique",

            "TotalPrice": "sum"

        })
        .reset_index()
    )

    # ====================================
    # RENAME
    # ====================================

    rfm.columns = [

        "CustomerID",
        "Recency",
        "Frequency",
        "Monetary"

    ]

    # ====================================
    # ENSURE UNIQUE CUSTOMERS
    # ====================================

    rfm = (
        rfm.drop_duplicates(
            subset=["CustomerID"]
        )
    )

    # ====================================
    # RFM SCORING
    # ====================================

    rfm["R_Score"] = pd.qcut(
        rfm["Recency"],
        5,
        labels=[5,4,3,2,1],
        duplicates="drop"
    )

    rfm["F_Score"] = pd.qcut(
        rfm["Frequency"]
        .rank(method="first"),
        5,
        labels=[1,2,3,4,5],
        duplicates="drop"
    )

    rfm["M_Score"] = pd.qcut(
        rfm["Monetary"],
        5,
        labels=[1,2,3,4,5],
        duplicates="drop"
    )

    # ====================================
    # TOTAL SCORE
    # ====================================

    rfm["RFM_Score"] = (

        rfm["R_Score"].astype(int)

        +

        rfm["F_Score"].astype(int)

        +

        rfm["M_Score"].astype(int)

    )

    # ====================================
    # SEGMENTATION
    # ====================================

    def segment_customer(score):

        if score >= 13:
            return "VIP"

        elif score >= 10:
            return "Loyal"

        elif score >= 7:
            return "Regular"

        elif score >= 5:
            return "At Risk"

        else:
            return "Lost"

    rfm["Segment"] = (
        rfm["RFM_Score"]
        .apply(segment_customer)
    )

    # ====================================
    # FINAL CLEAN
    # ====================================

    rfm = (
        rfm.drop_duplicates(
            subset=["CustomerID"]
        )
    )

    return rfm