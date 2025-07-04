from django.urls import path
from .views import FeedbackViewSet, feedback_stats, export_feedback_csv  # ✅ Added export_feedback_csv
from rest_framework.routers import DefaultRouter

# ✅ Router for Feedback API
router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet, basename='feedback')

urlpatterns = router.urls + [
    # ✅ Feedback statistics API
    path('feedback-stats/', feedback_stats),

    # ✅ Export feedback as CSV
    path('export/csv/', export_feedback_csv),  # ✅ This line is now active
]
