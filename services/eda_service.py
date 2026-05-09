# services/eda_service.py

def get_eda(df):
    if df.empty:
        return {"daily": []}

    df["date"] = df["InvoiceDate"].dt.date

    daily = df.groupby("date")["TotalPrice"].sum().reset_index()

    return {
        "daily": daily.tail(30).to_dict("records")
    }