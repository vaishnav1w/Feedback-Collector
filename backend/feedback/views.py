from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.http import HttpResponse
from collections import Counter
import csv

from .models import Feedback
from .serializers import FeedbackSerializer

# ✅ Simple Sentiment Analyzer
def analyze_sentiment(text):
    positive_keywords = [
        'good', 'great', 'excellent', 'love', 'satisfied', 'awesome',
        'perfect', 'nice', 'amazing', 'fantastic', 'wonderful', 'happy',
        'pleased', 'delightful', 'brilliant', 'quality', 'worth'
    ]
    negative_keywords = [
        'bad', 'terrible', 'poor', 'hate', 'worst', 'buggy', 'slow',
        'delay', 'issue', 'problem', 'disappointed', 'unhappy',
        'frustrated', 'fool'
    ]
    text = text.lower()
    if any(word in text for word in negative_keywords):
        return 'negative'
    elif any(word in text for word in positive_keywords):
        return 'positive'
    else:
        return 'neutral'

# ✅ Feedback CRUD API
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().order_by('-created_at')
    serializer_class = FeedbackSerializer

    def get_permissions(self):
        if self.action in ['list', 'create']:
            return [AllowAny()]         # ✅ Allow public GET and POST
        elif self.action in ['destroy']:
            return [IsAdminUser()]      # ✅ Only admin can DELETE
        return [IsAuthenticated()]      # ✅ Default fallback

    def create(self, request, *args, **kwargs):
        print("📥 Incoming Feedback Data:", request.data)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Serializer Validation Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        message = request.data.get('message', '')
        sentiment = analyze_sentiment(message)
        serializer.save(sentiment=sentiment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ✅ Feedback Statistics for Admin
@api_view(['GET'])
@permission_classes([IsAdminUser])
def feedback_stats(request):
    feedbacks = Feedback.objects.all()
    total = feedbacks.count()
    by_category = Counter(feedbacks.values_list('category', flat=True))
    by_type = Counter(feedbacks.values_list('type', flat=True))
    by_sentiment = Counter(feedbacks.values_list('sentiment', flat=True))

    return Response({
        'total': total,
        'category': dict(by_category),
        'type': dict(by_type),
        'sentiment': dict(by_sentiment),
    })

# ✅ Export Feedback as CSV (admin only)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_feedback_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=feedback.csv'

    writer = csv.writer(response)
    writer.writerow(['Name', 'Email', 'Type', 'Category', 'Message', 'Sentiment'])

    for fb in Feedback.objects.all():
        writer.writerow([
            fb.name,
            fb.email,
            fb.type,
            fb.category,
            fb.message,
            fb.sentiment
        ])

    return response
