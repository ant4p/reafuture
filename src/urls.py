from django.urls import path

from src.views import (
    ShowUploadPage,
    ShowMainPage,
    ShowReIAPage,
    ShowArchivePage,
    ShowArchiveWPage,
    ShowOPSPage,
    Show1,
    Show2,
    Show3,
    Show4,
    Show5,
    Show6,
)

app_name = "src"

urlpatterns = [
    path("", ShowUploadPage.as_view(), name="upload"),
    path("main/", ShowMainPage.as_view(), name="main"),
    path("reia/", ShowReIAPage.as_view(), name="reia"),
    path("archive/", ShowArchivePage.as_view(), name="archive"),
    path("archive_w/", ShowArchiveWPage.as_view(), name="archive_w"),
    path("ops/", ShowOPSPage.as_view(), name="ops"),
    path("1/", Show1.as_view(), name="1"),
    path("2/", Show2.as_view(), name="2"),
    path("3/", Show3.as_view(), name="3"),
    path("4/", Show4.as_view(), name="4"),
    path("5/", Show5.as_view(), name="5"),
    path("6/", Show6.as_view(), name="6"),
]
