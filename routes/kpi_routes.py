from fastapi import APIRouter, Request

from services.kpi_service import (
    get_kpis
)

router = APIRouter()


@router.get("/kpis")
def kpis(request: Request):

    df = request.app.state.df

    return get_kpis(df)