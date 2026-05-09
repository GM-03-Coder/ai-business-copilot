import pandas as pd

from services.segmentation_service import (
    perform_rfm_segmentation
)


def get_customer_overview(df):

    # =====================================
    # COPY
    # =====================================

    df = df.copy()

    # =====================================
    # CLEAN
    # =====================================

    df = df.dropna(
        subset=["CustomerID"]
    )

    df["CustomerID"] = (
        df["CustomerID"]
        .astype(str)
        .str.replace(".0", "", regex=False)
        .str.strip()
    )

    # =====================================
    # TOTAL PRICE
    # =====================================

    df["TotalPrice"] = (
        df["Quantity"] *
        df["UnitPrice"]
    )

    # =====================================
    # TOTAL CUSTOMERS
    # =====================================

    total_customers = (
        df["CustomerID"]
        .nunique()
    )

    # =====================================
    # RFM SEGMENTATION
    # =====================================

    rfm = perform_rfm_segmentation(df)

    # =====================================
    # VIP CUSTOMERS
    # =====================================

    vip_customers = len(

        rfm[
            rfm["Segment"] == "VIP"
        ]

    )

    # =====================================
    # AT RISK
    # =====================================

    at_risk = len(

        rfm[
            rfm["Segment"] == "At Risk"
        ]

    )

    # =====================================
    # AVG CUSTOMER VALUE
    # =====================================

    avg_customer_value = (

        df["TotalPrice"].sum()

        /

        total_customers

    )

    # =====================================
    # RETURN
    # =====================================

    return {

        "total_customers":
            int(total_customers),

        "vip_customers":
            int(vip_customers),

        "at_risk_customers":
            int(at_risk),

        "avg_customer_value":
            round(avg_customer_value, 2)

    }