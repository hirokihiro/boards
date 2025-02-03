from django.db import models


class AnimeQuote(models.Model):
    field1 = models.CharField(max_length=100)  # anime_title を field1 に変更
    field2 = models.TextField()  # quote を field2 に変更
    character_name = models.CharField(max_length=100, default="Unknown")
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.character_name} ({self.field1}): {self.field2}"


# class AnimeQuote(models.Model):
#     anime_title = models.CharField(max_length=100)  # アニメのタイトル
#     character_name = models.CharField(max_length=100)  # キャラクター名
#     quote = models.TextField()  # 名言
#     created_at = models.DateTimeField(auto_now_add=True)  # 作成日時
