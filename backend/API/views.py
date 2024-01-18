from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import *
from .serializers import *


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
