from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=10)

class Genre(models.Model):
    name = models.CharField(max_length=20)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='genres', through='Scoring', blank=True)

class Director(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=20)
    img_url = models.TextField()
    description = models.TextField()

class Actor(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=20)
    img_url = models.TextField()
    description = models.TextField()

class Movie(models.Model):
    tmdb = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=140)
    title_en = models.CharField(max_length=140)
    rate = models.CharField(max_length=100)
    directors = models.ManyToManyField(Director, related_name='movies', blank=True)
    actors = models.ManyToManyField(Actor, related_name='movies', blank=True)
    img_url = models.TextField()
    description = models.TextField()
    open_date = models.CharField(max_length=50)
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='movies', blank=True)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')
    follow_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follow_movies')
    
    class Meta:
        ordering=['-open_date', '-rate']
        
class WorldcupMovies(models.Model) :
    # pk = models.CharField(max_length=50)
    tmdb = models.CharField(max_length=50)
    title = models.CharField(max_length=140)
    title_en = models.CharField(max_length=140)
    rate = models.CharField(max_length=100)
    directors = models.ManyToManyField(Director, related_name='worldcupmovies', blank=True)
    actors = models.ManyToManyField(Actor, related_name='worldcupmovies', blank=True)
    img_url = models.TextField()
    description = models.TextField()
    open_date = models.CharField(max_length=50)
    genres = models.ManyToManyField(Genre, related_name='worldcupmovies', blank=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='worldcupmovies', blank=True)

class Review(models.Model):
    content = models.CharField(max_length=100)
    score = models.IntegerField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering=['-score']

class Worldcup(models.Model):
    movies = models.ManyToManyField(WorldcupMovies, related_name='worldcups', through='Ranking', blank=True)

class Ranking(models.Model):
    movie = models.ForeignKey(WorldcupMovies, on_delete=models.CASCADE)
    worldcup = models.ForeignKey(Worldcup, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

class Scoring(models.Model):
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

class LikeMovie(models.Model) :
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    likemovie = models.CharField(max_length=50, blank=True)
