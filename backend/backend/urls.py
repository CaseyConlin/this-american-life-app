from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from todo import views
from django.views.generic import TemplateView
from tal_app.views import serve_react
from django.conf import settings




from tal_app import views

router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')
router.register(r'episodes', views.TALView, 'episode')


urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path("", include("tal_app.urls"))
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),


]