import pandas as pd

from services.segmentation_service import (
    perform_rfm_segmentation
)


def get_customer_analytics(df):

    # =====================================
    # COPY DATA
    # =====================================

    data = df.copy()

    # =====================================
    # DATE
    # =====================================

    data["InvoiceDate"] = pd.to_datetime(
        data["InvoiceDate"],
        errors="coerce"
    )

    # =====================================
    # TOTAL PRICE
    # =====================================

    data["TotalPrice"] = (
        data["Quantity"] *
        data["UnitPrice"]
    )

    # =====================================
    # RFM
    # =====================================

    rfm = perform_rfm_segmentation(
        data
    )

    # =====================================
    # TOTAL REVENUE
    # =====================================

    total_revenue = (
        rfm["Monetary"].sum()
    )

    # =====================================
    # SEGMENT ANALYTICS
    # =====================================

    segment_summary = []

    grouped = (
        rfm.groupby("Segment")
    )

    for segment, group in grouped:

        customers = int(
            group.shape[0]
        )

        revenue = float(
            group["Monetary"].sum()
        )

        avg_value = float(
            group["Monetary"].mean()
        )

        contribution = round(

            (
                revenue /
                total_revenue
            ) * 100,

            2
        )

        segment_summary.append({

            "segment": segment,

            "customers": customers,

            "revenue": round(
                revenue,
                2
            ),

            "avg_value": round(
                avg_value,
                2
            ),

            "contribution": contribution

        })

    # =====================================
    # RFM SUMMARY
    # =====================================

    rfm_summary = {

        "avg_recency": round(
            rfm["Recency"].mean(),
            2
        ),

        "avg_frequency": round(
            rfm["Frequency"].mean(),
            2
        ),

        "avg_monetary": round(
            rfm["Monetary"].mean(),
            2
        )

    }

    # =====================================
    # TOP CUSTOMERS
    # =====================================

    top_customers = (

        rfm.sort_values(
            by="Monetary",
            ascending=False
        )

        [

            [
                "CustomerID",
                "Segment",
                "Monetary",
                "Frequency"
            ]

        ]

        .head(10)

    )

    top_customers = (
        top_customers.rename(
            columns={
                "Monetary":
                "Revenue"
            }
        )
    )

    # =====================================
    # RETURN
    # =====================================

    return {

        "segment_summary":
            segment_summary,

        "rfm_summary":
            rfm_summary,

        "top_customers":
            top_customers.to_dict(
                orient="records"
            )

    }