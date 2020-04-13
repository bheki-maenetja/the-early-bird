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
This project is a news site that provides users with the latest news and top headlines from a multitude of different sources across 54 countries around the world. Users can save their favourite news articles and follow their favourite publishers. When logged in users will have a newsfeed consisting of top stories from their favourite news sources. Additionally, the site also features a weather application where users can get the latest weather conditions for major cities across the world.

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