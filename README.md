# The Early Bird (Fullstack Django App)
The Early Bird is a news website that provides the latest news and top headlines from a multitude of different sources across 54 countries. This a fullstack web application built with Django, PostgreSQL and ReactJS.

## Getting Started
### Installation
- Clone this repository by running the terminal command `git clone git@github.com:bheki-maenetja/the-early-bird.git`
- In the root folder run the terminal command `pipenv shell`
- In the root folder run the terminal command `pipenv install` to install all necessary packages and modules for the backend
- Navigate to the folder called frontend and run ther terminal command `yarn` to install all necessary packages and modules for the frontend
- To view the site locally run the terminal command `python manage.py runserver` and navigate to localhost:8000 in your web browser

### Deployment
- You can view a deployed version of the site [here](https://the-early-bird.herokuapp.com/)

## Technologies Used
- Python 3
- Django
- PostgreSQL
- ReactJS
- JavaScript (ES6)
- HTML 5
- SCSS/SASS
- Bulma CSS Framework
- Yarn
- Axios
* Third-party APIs
  * [NewsAPI](https://newsapi.org/)
  * [Mapbox](https://www.mapbox.com/)
  * [OpenWeatherAPI](https://openweathermap.org/api)

## Overview
This project is a news site that provides users with the latest news and top headlines from a multitude of different sources across 54 countries around the world. Users can save their favourite news articles and follow their favourite publishers. When logged in, users will have a newsfeed consisting of top stories from their favourite news sources. Additionally, the site also features a weather application where users can get the latest weather conditions for major cities across the world.

<figcaption>Home Page</figcation>
<img src="frontend/src/assets/screenshot-homePage.png" width="100%" />

<figcaption>User's can get top news headlines from over 50 Countries</figcaption>
<img src="frontend/src/assets/screenshot-topNewsPage.gif" width="100%" />

<figcaption>User's can save articles and follow their favourite publishers</figcation>
<img src="frontend/src/assets/screenshot-profilePage.gif" width="100%" />

<figcaption>The Early Bird gets articles from dozens of news sources around the world</figcation>
<img src="frontend/src/assets/screenshot-publishersPage.gif" width="100%" />

<figcaption>Keep up to date with the weather forecast with The Early Bird's built-in weather app</figcation>
<img src="frontend/src/assets/screenshot-weatherPage.png" width="100%" />

## Development
This project is a fullstack web application. The backend consists of a PostgreSQL database hosted on a Django server. The frontend was built using React.js and styled with SASS and the Bulma CSS framework. Unlike my previous fullstack projects this project is more 'frontend heavy'. The backend is quite basic, with only one Django app and three models.

### APIs
- This project is powered by several third-party APIs. All news articles and news sources are retrieved with the [NewsAPI](https://newsapi.org/). The weather application is built with [Mapbox](https://www.mapbox.com/) and the [OpenWeatherAPI](https://openweathermap.org/api).
- All news pages use the `top-headlines` endpoint of the [NewsAPI](https://newsapi.org/). This endpoint returns the top 20 news stories for any particular category and/or country.

### Saving Articles
- Given that the news articles are frequently updated, the articles themselves are not stored in a database. Instead, when users 'save' an article an object with selected data from the article is stored in the database and linked to the user.
- Rather than one article having a one-to-many relationship with users, each user will have their own copy of the same article. If a user wishes to remove the article the copy is simply deleted.

```
# Backend functionality for handling articles

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
```  