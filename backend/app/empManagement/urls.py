from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API schema & docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),

    # App URLs
    path('api/', include('accounts.urls')),
    path('api/companies/', include('companies.urls')),
    path('api/departments/', include('departments.urls')),
    path('api/employees/', include('employees.urls')),
]
