import pandas as pd


def preprocess(df):

    try:

        if df.empty:
            print("❌ EMPTY DATAFRAME")
            return pd.DataFrame()

        required = [
            "CustomerID",
            "InvoiceDate",
            "InvoiceNo",
            "Quantity",
            "UnitPrice"
        ]

        print("📊 AVAILABLE COLUMNS:")
        print(df.columns)

        for col in required:

            if col not in df.columns:
                print(f"❌ Missing column: {col}")
                return pd.DataFrame()

        df = df.copy()

        df["InvoiceDate"] = pd.to_datetime(
            df["InvoiceDate"],
            errors="coerce"
        )

        df["Quantity"] = pd.to_numeric(
            df["Quantity"],
            errors="coerce"
        )

        df["UnitPrice"] = pd.to_numeric(
            df["UnitPrice"],
            errors="coerce"
        )

        df = df.dropna()

        df = df[
            (df["Quantity"] > 0) &
            (df["UnitPrice"] > 0)
        ]

        df["TotalPrice"] = (
            df["Quantity"] *
            df["UnitPrice"]
        )

        print("✅ CLEAN ROWS:", len(df))

        return df

    except Exception as e:

        print("❌ PREPROCESS ERROR:", e)

        return pd.DataFrame()