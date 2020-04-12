from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ArticleView, PublisherView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('my-profile/', ProfileView.as_view()),
  path('articles/', ArticleView.as_view()),
  path('publishers/', PublisherView.as_view())
]