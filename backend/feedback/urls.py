# feedback/urls.py

from django.urls import path
from .views import FeedbackViewSet, feedback_stats, export_feedback_csv
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet, basename='feedback')

urlpatterns = router.urls + [
    path('feedback-stats/', feedback_stats, name='feedback-stats'),
    path('export/csv/', export_feedback_csv, name='export-feedback-csv'),  # ✅ CSV route
]
