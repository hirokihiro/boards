from django.views.generic import TemplateView
from logging import getLogger
from django.shortcuts import render
from django.apps import apps  # apps.get_model を使用

logger = getLogger(__name__)

class HomeView(TemplateView):
    template_name = "index.html"
    extra_context = {"message": "Welcome to the Home Page!"}

# 遅延インポートで AnimeQuote モデルを取得
AnimeQuote = apps.get_model("myapp", "AnimeQuote")

def anime_quotes_view(request):
    # AnimeQuote を使用してデータを取得
    quotes = AnimeQuote.objects.all()
    return render(request, "anime_quotes.html", {"quotes": quotes})
