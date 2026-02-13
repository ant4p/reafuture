from django.urls import path

from src.views import ShowUploadPage, ShowMainPage, ShowReIAPage

app_name = "src"

urlpatterns = [
    path("", ShowUploadPage.as_view(), name="upload"),
    path("main/", ShowMainPage.as_view(), name="main"),
    path("reia/", ShowReIAPage.as_view(), name="reia"),

]
