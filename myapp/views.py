from django.shortcuts import render, redirect, get_object_or_404
from .forms import AnimeQuoteForm
from django.db import models
from django.apps import apps

# 遅延インポートで AnimeQuote モデルを取得
AnimeQuote = apps.get_model("myapp", "AnimeQuote")


# ホームページのビュー
def home(request):
    query = request.GET.get("q", "")  # query 変数を定義

    # POSTリクエストが送信された場合（フォームの送信）
    if request.method == "POST":
        form = AnimeQuoteForm(request.POST)
        if form.is_valid():
            form.save()  # データベースに保存
            return redirect("myapp:home")  # 修正
    else:
        form = AnimeQuoteForm()  # 空のフォームを作成

    # データベースから全ての名言を取得
    if query:
        quotes = AnimeQuote.objects.filter(
            models.Q(field1__icontains=query)  # anime_title を field1 に変更
            | models.Q(character_name__icontains=query)
            | models.Q(field2__icontains=query)  # quote を field2 に変更
        )
    else:
        quotes = AnimeQuote.objects.all().order_by("-id")

    return render(
        request, "home.html", {"form": form, "quotes": quotes, "query": query}
    )


def delete_quote(request, quote_id):
    quote = get_object_or_404(AnimeQuote, id=quote_id)
    quote.delete()
    return redirect("myapp:home")
