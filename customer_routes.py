from fastapi import APIRouter, Request

from services.segmentation_service import (
    perform_rfm_segmentation
)

from services.behavior_service import (
    get_behavior
)

from services.customer_service import (
    get_customer_overview
)

from services.customer_analytics_service import (
get_customer_analytics
)

router = APIRouter()

# =====================================
# SEGMENTS
# =====================================

@router.get("/segments")
def segments(request: Request):

    df = request.app.state.df

    # =========================
    # RFM SEGMENTATION
    # =========================

    rfm = perform_rfm_segmentation(df)

    # =========================
    # SEGMENT COUNTS
    # =========================

    segment_counts = (
        rfm["Segment"]
        .value_counts()
        .reset_index()
    )

    # =========================
    # RENAME
    # =========================

    segment_counts.columns = [
        "segment",
        "count"
    ]

    # =========================
    # RETURN JSON
    # =========================

    return segment_counts.to_dict(
        orient="records"
    )


# =====================================
# CUSTOMER OVERVIEW
# =====================================

@router.get("/customer-overview")
def customer_overview(request: Request):

    df = request.app.state.df

    return get_customer_overview(df)


# =====================================
# CUSTOMER BEHAVIOR
# =====================================

@router.get("/behavior")
def behavior(request: Request):

    df = request.app.state.df

    return get_behavior(df)



# =====================================
# CUSTOMER ANALYTICS
# =====================================

@router.get("/customer-analytics")
def customer_analytics(request: Request):

    df = request.app.state.df

    return get_customer_analytics(df)

