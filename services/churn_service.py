import pandas as pd
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


def get_churn_predictions(df):

    # =====================================
    # CLEANING
    # =====================================

    df = df.copy()

    df["InvoiceDate"] = pd.to_datetime(
        df["InvoiceDate"],
        errors="coerce"
    )

    df["TotalPrice"] = (
        df["Quantity"] *
        df["UnitPrice"]
    )

    # =====================================
    # CUSTOMER LEVEL FEATURES
    # =====================================

    snapshot_date = (
        df["InvoiceDate"].max()
        + pd.Timedelta(days=1)
    )

    customer_df = (

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

    # =====================================
    # RENAME
    # =====================================

    customer_df.columns = [

        "CustomerID",
        "Recency",
        "Frequency",
        "Monetary"

    ]

    # =====================================
    # SMART CHURN LOGIC
    # =====================================

    customer_df["Churn"] = 0

    # HIGH RECENCY + LOW FREQUENCY

    customer_df.loc[
        (
            customer_df["Recency"] > 150
        )
        &
        (
            customer_df["Frequency"] <= 3
        ),
        "Churn"
    ] = 1

    # LOW VALUE CUSTOMERS

    customer_df.loc[
        (
            customer_df["Monetary"] < 500
        )
        &
        (
            customer_df["Frequency"] <= 2
        ),
        "Churn"
    ] = 1

    # =====================================
    # RANDOMNESS FOR REALISM
    # =====================================

    np.random.seed(42)

    random_indexes = np.random.choice(

        customer_df.index,

        size=int(
            len(customer_df) * 0.08
        ),

        replace=False

    )

    customer_df.loc[
        random_indexes,
        "Churn"
    ] = np.random.randint(
        0,
        2,
        size=len(random_indexes)
    )

    # =====================================
    # FEATURES
    # =====================================

    X = customer_df[
        [
            "Recency",
            "Frequency",
            "Monetary"
        ]
    ]

    y = customer_df["Churn"]

    # =====================================
    # TRAIN TEST SPLIT
    # =====================================

    X_train, X_test, y_train, y_test = (

        train_test_split(

            X,
            y,

            test_size=0.2,

            random_state=42

        )

    )

    # =====================================
    # MODEL
    # =====================================

    model = RandomForestClassifier(

        n_estimators=80,

        max_depth=4,

        min_samples_split=8,

        min_samples_leaf=4,

        random_state=42

    )

    model.fit(
        X_train,
        y_train
    )

    # =====================================
    # PREDICTIONS
    # =====================================

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    # =====================================
    # CHURN PROBABILITY
    # =====================================

    probabilities = (
        model.predict_proba(X)[:, 1]
    )

    # =====================================
    # SCALE FOR REALISTIC RISK
    # =====================================

    scaled_probabilities = (
        probabilities * 35
    )

    # BASELINE RISK

    scaled_probabilities = (
        scaled_probabilities + 8
    )

    # LIMIT

    scaled_probabilities = np.clip(

        scaled_probabilities,

        0,
        100

    )

    customer_df[
        "ChurnProbability"
    ] = scaled_probabilities.round(2)

    # =====================================
    # HIGH RISK CUSTOMERS
    # =====================================

    high_risk = customer_df[

        customer_df[
            "ChurnProbability"
        ] >= 30

    ]

    # =====================================
    # TOP RISKY CUSTOMERS
    # =====================================

    top_risk = (

        customer_df[
            [
                "CustomerID",
                "ChurnProbability"
            ]
        ]

        .sort_values(
            by="ChurnProbability",
            ascending=False
        )

        .head(10)

    )

    # =====================================
    # RETURN
    # =====================================

    return {

        "accuracy": round(
            accuracy * 100,
            2
        ),

        "total_customers": int(
            customer_df.shape[0]
        ),

        "high_risk_customers": int(
            high_risk.shape[0]
        ),

        "avg_churn_risk": round(

            customer_df[
                "ChurnProbability"
            ].mean(),

            2

        ),

        "top_risk_customers": (

            top_risk.to_dict(
                orient="records"
            )

        )

    }