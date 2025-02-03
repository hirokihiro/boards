# myapp/apps.py
from django.apps import AppConfig

class MyappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "myapp"  # 必ずここが "myapp" であることを確認
