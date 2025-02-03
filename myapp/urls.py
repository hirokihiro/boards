from django.urls import path
from . import views

app_name = "myapp"
urlpatterns = [
    path("", views.home, name="home"),
    path("delete/<int:quote_id>/", views.delete_quote, name="delete_quote"),
]
