#pylint: disable = no-member, arguments-differ
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
  email = models.CharField(max_length=40, unique=True)
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)

  def __str__(self):
    return f'{self.username} (Id: {self.id})'

class FavouritePublisher(models.Model):
  user = models.ForeignKey(User, related_name='favourite_publishers', null=False, on_delete=models.CASCADE)
  name = models.CharField(max_length=1000)
  slug = models.CharField(max_length=100, null=False)
  description = models.CharField(max_length=300)
  source_url = models.CharField(max_length=1000)

  def __str__(self):
    return f'{self.name} (Id: {self.id})'

class SavedArticle(models.Model):
  user = models.ForeignKey(User, related_name='saved_articles', null=False, on_delete=models.CASCADE)
  publisher = models.CharField(max_length=1000)
  author = models.CharField(max_length=1000)
  title = models.CharField(max_length=1000)
  description = models.CharField(max_length=1000)
  content = models.CharField(max_length=1000)
  publish_date = models.CharField(max_length=1000)
  source_url = models.CharField(max_length=1000)
  image_url = models.CharField(max_length=1000)

  def __str__(self):
    return f'{self.title} (Id: {self.id})'