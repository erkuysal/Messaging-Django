from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin


from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from accounts.views import AccountViewSet, JWTCookieTokenObtainView

from server.views import CategoryListViewSet, ServerListViewSet

from chatinator.views import MessageViewSet
from chatinator.consumer import ChatConsumer

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="messages")
router.register("api/account", AccountViewSet, basename="account")

urlpatterns = [
    path('admin/', admin.site.urls),

    # --------- API VIEWS ----------
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/schema/ui', SpectacularSwaggerView.as_view()),
    path('api/token/', JWTCookieTokenObtainView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # --------- MODULE ROUINGS ---------

] + router.urls


websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", ChatConsumer.as_asgi()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

