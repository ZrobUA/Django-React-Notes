"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from API.views import *
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r"note", NoteViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/drf-auth/", include("rest_framework.urls")),
    path("api/v1/auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
]
"""
BASIC ENDPOINTS
Authorization: Token 216te2fgt7f3g8goy
http://127.0.0.1:8000/api/v1/auth/users/me/ DELETE current_password:3dfueniu      (delete user)
http://127.0.0.1:8000/api/v1/auth/users/me/ GET                                   (get my account)
http://127.0.0.1:8000/api/v1/auth/users/    GET                                   (get users)

http://127.0.0.1:8000/api/v1/auth/users/    POST   username:sfewf password:sfefef (register new user)  optional email:fgegeg
http://127.0.0.1:8000/auth/token/login/     POST   username:sfewf password:sfefef (login user)
http://127.0.0.1:8000/auth/token/logout/    POST   username:sfewf password:sfefef (logout user)

MORE
https://djoser.readthedocs.io/en/latest/base_endpoints.html#

"""
