from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_notes(request, query):
    # Реализация поиска заметок по тексту или другим критериям
    notes = Note.objects.filter(text__icontains=query)
    serialized_notes = NoteSerializer(notes, many=True)
    return Response(serialized_notes.data)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=["GET"])
    def notes(self, request, pk=None):
        category = self.get_object()
        notes = Note.objects.filter(category=category)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
