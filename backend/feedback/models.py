from django.db import models

class Feedback(models.Model):
    CATEGORY_CHOICES = [
        ('feature', 'Feature Request'),
        ('bug', 'Bug Report'),
        ('general', 'General'),
    ]

    TYPE_CHOICES = [
        ('product', 'Product'),
        ('service', 'Service'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='product')  # ✅ NEW FIELD
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    message = models.TextField()
    sentiment = models.CharField(max_length=10, default='neutral', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.type} - {self.category}"
