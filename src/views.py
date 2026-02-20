from django.shortcuts import render
from django.views.generic import TemplateView

class ShowUploadPage(TemplateView):
    template_name = "src/upload.html"

class ShowMainPage(TemplateView):
    template_name = "src/index.html"

class ShowReIAPage(TemplateView):
    template_name = "src/reia.html"

class ShowArchivePage(TemplateView):
    template_name = "src/archive.html"

class ShowArchiveWPage(TemplateView):
    template_name = "src/archive_w.html"

class ShowOPSPage(TemplateView):
    template_name = "src/ops.html"

class ShowEMPage(TemplateView):
    template_name = "src/energomarket.html"

class ShowConsPage(TemplateView):
    template_name = "src/cons.html"

class ShowAxisPage(TemplateView):
    template_name = "src/axis.html"

class ShowConventionPage(TemplateView):
    template_name = "src/convention.html"

class ShowCODPage(TemplateView):
    template_name = "src/cod.html"

class ShowRiskPage(TemplateView):
    template_name = "src/risk.html"

def handler_404(request, exception):
    return render(request, template_name='src/error_404.html')

class Show1(TemplateView):
    template_name = "src/1.html"

class Show2(TemplateView):
    template_name = "src/2.html"

class Show3(TemplateView):
    template_name = "src/3.html"

class Show4(TemplateView):
    template_name = "src/4.html"

class Show5(TemplateView):
    template_name = "src/5.html"

class Show6(TemplateView):
    template_name = "src/6.html"
    