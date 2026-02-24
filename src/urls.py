from django.urls import path

from src.views import (
    ShowUploadPage,
    ShowMainPage,
    ShowReIAPage,
    ShowArchivePage,
    ShowLabPage,
    ShowOPSPage,
    ShowEMPage,
    ShowConsPage,
    ShowAxisPage,
    ShowConventionPage,
    ShowCODPage,
    ShowRiskPage,
#     Show1,
    # Show2,
#     Show3,
#     Show4,
#     Show5,
#     Show6,
)

app_name = "src"

urlpatterns = [
    path("", ShowUploadPage.as_view(), name="upload"),
    path("main/", ShowMainPage.as_view(), name="main"),
    path("reia/", ShowReIAPage.as_view(), name="reia"),
    path("archive/", ShowArchivePage.as_view(), name="archive"),
    path("lab/", ShowLabPage.as_view(), name="lab"),
    path("ops/", ShowOPSPage.as_view(), name="ops"),
    path("energomarket/", ShowEMPage.as_view(), name="energomarket"),
    path("cons/", ShowConsPage.as_view(), name="cons"),
    path("axis/", ShowAxisPage.as_view(), name="axis"),
    path("convention/", ShowConventionPage.as_view(), name="convention"),
    path("cod/", ShowCODPage.as_view(), name="cod"),
    path("risk/", ShowRiskPage.as_view(), name="risk"),
    # path("1/", Show1.as_view(), name="1"),
    # path("2/", Show2.as_view(), name="2"),
    # path("3/", Show3.as_view(), name="3"),
    # path("4/", Show4.as_view(), name="4"),
    # path("5/", Show5.as_view(), name="5"),
    # path("6/", Show6.as_view(), name="6"),
]
