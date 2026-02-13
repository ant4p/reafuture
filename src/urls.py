from django.urls import path

from src.views import ShowUploadPage, ShowMainPage

app_name = "src"

urlpatterns = [
    path("", ShowUploadPage.as_view(), name="upload"),
    path("main/", ShowMainPage.as_view(), name="main"),

]
