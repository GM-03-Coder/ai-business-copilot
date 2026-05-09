def get_priority(rfm):
    rfm["priority"] = (
        0.5 * rfm["Recency_norm"] +
        0.3 * (1 - rfm["Frequency_norm"]) +
        0.2 * (1 - rfm["Monetary_norm"])
    )

    top = rfm.sort_values("priority", ascending=False).head(10)

    return top[["CustomerID", "priority"]].to_dict("records")