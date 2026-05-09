import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "dataset.csv"
)

print("📂 DATA PATH:", DATA_PATH)