from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.data_loader import load_data
from utils.preprocess import preprocess

from routes.dashboard_routes import router as dashboard
from routes.customer_routes import router as customer_routes
from routes.kpi_routes import router as kpi_routes
from routes.ai_routes import router as ai_routes

# =========================
# APP
# =========================
app = FastAPI()

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD DATA ONLY ONCE
# =========================
print("🚀 Loading dataset once...")

RAW_DF = load_data()
GLOBAL_DF = preprocess(RAW_DF)

print("✅ Dataset ready")

# =========================
# SHARE GLOBALLY
# =========================
app.state.df = GLOBAL_DF

# =========================
# ROUTES
# =========================
app.include_router(dashboard)
app.include_router(customer_routes)
app.include_router(kpi_routes)
app.include_router(ai_routes)
# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def home():
    return {"status": "Backend running"}