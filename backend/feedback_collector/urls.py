# feedback_collector/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse  # ✅ To serve home page

def home_view(request):
    return HttpResponse("<h1>🎉 Welcome to Feedback Collector API</h1><p>Go to /admin or /api</p>")

urlpatterns = [
    path('', home_view),  # ✅ Home route
    path('admin/', admin.site.urls),  # ✅ Optional: admin panel
    path('api/', include('feedback.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
