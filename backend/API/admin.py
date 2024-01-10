from django.contrib import admin
from .models import *


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "text", "category"]
    list_filter = ["user", "category"]
    search_fields = ["text"]
    date_hierarchy = "created"
    ordering = ["-created"]


admin.site.register(Category)
