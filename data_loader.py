import pandas as pd
from config import DATA_PATH

_cache = None


def load_data():

    global _cache

    if _cache is not None:
        return _cache.copy()

    try:

        print("📂 LOADING:", DATA_PATH)

        df = pd.read_csv(
            DATA_PATH,
            encoding="ISO-8859-1",
            low_memory=False
        )

        # CLEAN COLUMNS
        df.columns = (
            df.columns
            .str.strip()
            .str.replace(" ", "")
        )

        print("✅ DATA LOADED")
        print(df.columns)

        _cache = df

        return df.copy()

    except Exception as e:

        print("❌ LOAD ERROR:", e)

        return pd.DataFrame()