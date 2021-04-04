from django.urls import path
from .views import NewsArticleView

urlpatterns = [
    path('get-articles/', NewsArticleView.as_view())
]