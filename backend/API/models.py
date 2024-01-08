from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    text = models.TextField()
    category = models.ForeignKey("API.Category", on_delete=models.PROTECT, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]
        indexes = [models.Index(fields=["-created"])]

    def __str__(self):
        return self.text

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
