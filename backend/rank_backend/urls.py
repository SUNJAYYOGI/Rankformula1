from django.contrib import admin
from django.urls import path
from core.api import api # Hamari banayi hui API import ki
# Import zaroori hain media files dikhane ke liye local mein
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls), # React is '/api/...' par request bhejega
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)