from django.views.generic import TemplateView

class ShowUploadPage(TemplateView):
    template_name = "src/upload.html"

class ShowMainPage(TemplateView):
    template_name = "src/index.html"
