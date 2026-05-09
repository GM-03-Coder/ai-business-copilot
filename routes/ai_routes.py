from fastapi import APIRouter, Request

from services.churn_service import (
    get_churn_predictions
)

router = APIRouter()


# =====================================
# CHURN PREDICTION
# =====================================

@router.get("/prediction")
def prediction(request: Request):

    df = request.app.state.df

    return get_churn_predictions(df)