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
router.register(r"category", CategoryViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/drf-auth/", include("rest_framework.urls")),
    path("api/v1/auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
    path(
        "api/v1/category/<int:pk>/notes/",
        CategoryViewSet.as_view({"get": "notes"}),
        name="category-notes",
    ),
    path("api/v1/notes/<str:query>/", search_notes, name="search_notes"),
]
"""
BASIC ENDPOINTS (Authentication)
Authorization: Token 216te2fgt7f3g8goy

http://127.0.0.1:8000/api/v1/auth/users/me/ DELETE current_password:3dfueniu      (delete user)
http://127.0.0.1:8000/api/v1/auth/users/me/ GET                                   (get my account)
http://127.0.0.1:8000/api/v1/auth/users/    GET                                   (get users)
http://127.0.0.1:8000/auth/token/logout/    POST                                  (logout user)


http://127.0.0.1:8000/api/v1/auth/users/    POST   username:sfewf password:sfefef (register new user)  optional email:fgegeg
http://127.0.0.1:8000/auth/token/login/     POST   username:sfewf password:sfefef (login user)


MORE
https://djoser.readthedocs.io/en/latest/base_endpoints.html#

                (notes)
Authorization: Token 216te2fgt7f3g8goy

http://127.0.0.1:8000/api/v1/note/          GET                                   (get notes)
http://127.0.0.1:8000/api/v1/note/1/        GET                                   (get note)
http://127.0.0.1:8000/api/v1/note/          POST   text:fsfef category_text:s     (create note)
http://127.0.0.1:8000/api/v1/note/1/        PUT    text:fsfef category_text:s     (edit note)
http://127.0.0.1:8000/api/v1/note/1/        DELETE                                (delete note)

                (Categories)
Authorization: Token 216te2fgt7f3g8goy

http://127.0.0.1:8000/api/v1/category/      GET                                   (get categoryies)
http://127.0.0.1:8000/api/v1/category/1/    GET                                   (get category)
http://127.0.0.1:8000/api/v1/category/      POST   name:fsfef                     (create category)
http://127.0.0.1:8000/api/v1/category/1/    PUT    name:fsfef                     (edit category)
http://127.0.0.1:8000/api/v1/category/1/    DELETE                                (delete category)

127.0.0.1:8000/api/v1/category/3/notes/     GET                                   (get notes by category)
127.0.0.1:8000/api/v1/notes/(noteText)/     GET                                   (get notes by note text)

"""
