from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from companies.views import CompanyViewSet
from departments.views import DepartmentViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = DefaultRouter()
router.register('companies', CompanyViewSet)
router.register('departments', DepartmentViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view()),
    path('api/docs/', SpectacularSwaggerView.as_view()),
]
urlpatterns += router.urls