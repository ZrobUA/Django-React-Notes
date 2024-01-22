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
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="notes",
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

    def delete(self, *args, **kwargs):
        # Проверяем, есть ли у заметки связанная категория
        if self.category:
            # Если у категории только одна заметка, удаляем и категорию
            if (
                Note.objects.filter(category=self.category).exclude(pk=self.pk).count()
                == 0
            ):
                self.category.delete()

        super().delete(*args, **kwargs)

