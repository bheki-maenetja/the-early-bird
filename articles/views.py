from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE
from django.contrib.auth import get_user_model
from django.conf import settings

from urllib.request import urlopen
import json
import requests

# Create your views here.
class NewsArticleView(APIView):

    def post(self, request):
        api_url = request.data['api_url']
        res = requests.get(api_url)
        article_data = res.json()

        return Response(article_data)