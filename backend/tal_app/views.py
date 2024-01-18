from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EpisodeSerializer
from .models import Episode
# Create your views here.
class TALView(viewsets.ModelViewSet):
    serializer_class = EpisodeSerializer
    queryset = Episode.objects.all()

