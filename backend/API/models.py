from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    text = models.TextField()
    category_text = models.CharField(
        max_length=100
    )  # Поле для текста категории, введенного пользователем
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, null=True, blank=True
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]
        indexes = [models.Index(fields=["-created"])]

    def __str__(self):
        return self.text

    def save(self, *args, **kwargs):
        # Перед сохранением заметки проверяем существование категории
        category, created = Category.objects.get_or_create(name=self.category_text)
        self.category = category
        super().save(*args, **kwargs)
