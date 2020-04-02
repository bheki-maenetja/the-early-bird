# pylint: disable=no-member

from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, ArticleSerializer, PublisherSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import SavedArticle, FavouritePublisher

User = get_user_model()

# Register & Login
class RegisterView(APIView):

  def post(self, request):
    serialized_user = UserSerializer(data=request.data)

    if serialized_user.is_valid():
      serialized_user.save()
      return Response({ 'message': 'Registration Successful' }, status=HTTP_201_CREATED)
    
    return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
      user = User.objects.get(email=email)

      if not user.check_password(password):
        raise PermissionDenied({'message': 'Invalid Credentials'})

      dt = datetime.now() + timedelta(days=14)
      token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

      return Response({'token': token, 'message': f'Welcome back {user.username}'})
    except User.DoesNotExist:
      raise PermissionDenied({'message': 'Invalid Credentials'})

# User Profile
class ProfileView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, request):
    try:
      user = User.objects.get(pk=request.user.id)
      serialized_user = PopulatedUserSerializer(user)
      return Response(serialized_user.data, status=HTTP_200_OK)
    except:
      return Response({'message', 'User not found'}, status=HTTP_404_NOT_FOUND)

# Articles
class ArticleView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, _request):
    articles = SavedArticle.objects.all()
    serialized_articles = ArticleSerializer(articles, many=True)
    return Response(serialized_articles.data, status=HTTP_200_OK)
  
  def post(self, request):
    request.data['user'] = request.user.id
    new_article = ArticleSerializer(data=request.data)

    if new_article.is_valid():
      new_article.save()
      return Response(new_article.data, status=HTTP_201_CREATED)
    return Response(new_article.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
  
  def delete(self, request):
    try:
      article = SavedArticle.objects.get(pk=request.data['articleId'])
      if article.user.id != request.user.id:
        return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'}, status=HTTP_401_UNAUTHORIZED)
      article.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except:
      return Response({'message': 'Not found'}, status=HTTP_404_NOT_FOUND)
  
# Publishers
class PublisherView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, _request):
    publishers = FavouritePublisher.objects.all()
    serialized_publishers = PublisherSerializer(publishers, many=True)
    return Response(serialized_publishers.data, status=HTTP_200_OK)

  def post(self, request):
    request.data['user'] = request.user.id
    new_publisher = PublisherSerializer(data=request.data)

    if new_publisher.is_valid():
      new_publisher.save()
      return Response(new_publisher.data, status=HTTP_201_CREATED)
    return Response(new_publisher.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
  
  def delete(self, request):
    try:
      publisher = FavouritePublisher.objects.get(pk=request.data['publisherId'])
      if publisher.user.id != request.user.id:
        return Response({'message': 'UNAUTHORIZED!!! GET OUT OF HERE!!!'}, status=HTTP_401_UNAUTHORIZED)
      publisher.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except:
      return Response({'message': 'Not found'}, status=HTTP_404_NOT_FOUND)