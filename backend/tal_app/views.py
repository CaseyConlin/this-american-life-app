from django.shortcuts import render
from rest_framework import viewsets
import posixpath
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve

from .serializers import EpisodeSerializer
from .models import Episode

# Create your views here.
class TALView(viewsets.ModelViewSet):
    serializer_class = EpisodeSerializer
    queryset = Episode.objects.all()
    lookup_field = 'episode_num'



def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)
