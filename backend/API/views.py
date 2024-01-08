from django.shortcuts import render

from rest_framework import viewsets
from .models import *
from .serializers import *


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
