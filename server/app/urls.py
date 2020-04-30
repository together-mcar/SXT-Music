from django.conf.urls import url, include
from .views import login, register

urlpatterns = [
  url(r'login', login),
  url(r'register', register),
]