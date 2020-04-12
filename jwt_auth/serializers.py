from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
# import django.contrib.auth.password_validation as validations
# from django.core.exceptions import ValidationError

from .models import FavouritePublisher, SavedArticle

User = get_user_model()

# Native Serializers
class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise serializers.ValidationError({'password_confirmation': 'Does Not Match'})

    # try:
    #   validations.validate_password(password=password)
    # except ValidationError as err:
    #   raise serializers.ValidationError({'password_confirmation': err.messages})

    data['password'] = make_password(password)
    return data
  
  class Meta:
    model = User
    fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):

  class Meta:
    model = FavouritePublisher
    fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):

  class Meta:
    model = SavedArticle
    fields = '__all__'

# Populated Native Serializers
class PopulatedUserSerializer(UserSerializer):
  favourite_publishers = PublisherSerializer(many=True)
  saved_articles = ArticleSerializer(many=True)
