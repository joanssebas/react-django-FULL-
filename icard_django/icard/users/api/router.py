
from rest_framework.routers import DefaultRouter
from django.urls import path

from users.api.views import UserApiViewSet,USerView
from rest_framework_simplejwt.views import TokenObtainPairView

router_user = DefaultRouter()

router_user.register(
    prefix='users', basename='users', viewset=UserApiViewSet
)

urlpatterns = [
    path('auth/me',USerView.as_view()),
    path('auth/login/',TokenObtainPairView.as_view(),name='token_obtain_pair')
]