from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views
from tal_app import views

router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')
router.register(r'episodes', views.TALView, 'episode')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]