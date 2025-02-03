from django import forms
from .models import AnimeQuote

class AnimeQuoteForm(forms.ModelForm):
    class Meta:
        model = AnimeQuote
        fields = ['field1', 'field2', 'character_name']  # anime_title を field1 に、quote を field2 に変更
        labels = {
            'field1': 'アニメタイトル',
            'field2': '名言',
            'character_name': 'キャラクター名',
        }


