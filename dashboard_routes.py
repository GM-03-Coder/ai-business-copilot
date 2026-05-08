from fastapi import APIRouter
from utils.data_loader import load_data
from utils.preprocess import preprocess

import pandas as pd

router = APIRouter()


@router.get("/trends")
def trends():

    # LOAD DATA

    df = load_data()

    df = preprocess(df)

    # DATE

    df["InvoiceDate"] = pd.to_datetime(
        df["InvoiceDate"],
        errors="coerce"
    )

    df = df.dropna(
        subset=["InvoiceDate"]
    )

    # YEAR MONTH

    df["YearMonth"] = (
        df["InvoiceDate"]
        .dt.to_period("M")
        .astype(str)
    )

    # MONTHLY GROUP

    monthly = (
        df.groupby("YearMonth")
        .agg({
            "TotalPrice": "sum",
            "CustomerID": "nunique"
        })
        .reset_index()
    )

    # RENAME

    monthly.columns = [
        "month",
        "revenue",
        "customers"
    ]

    # PROFIT

    monthly["profit"] = (
        monthly["revenue"] * 0.15
    )

    # SORT

    monthly = monthly.sort_values(
        "month"
    )

    # ROUND VALUES

    monthly["revenue"] = (
        monthly["revenue"]
        .round(2)
    )

    monthly["profit"] = (
        monthly["profit"]
        .round(2)
    )

    monthly["customers"] = (
        monthly["customers"]
        .astype(int)
    )

    return monthly.to_dict(
        orient="records"
    )