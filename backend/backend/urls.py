from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin


from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from accounts.views import AccountViewSet, JWTCookieTokenObtainView, JWTCookieTokenRefreshView, LogOutAPIView, RegisterView

from server.views import CategoryListViewSet, ServerListViewSet

from chatinator.views import MessageViewSet
from chatinator.consumer import ChatConsumer


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
    path('api/token/refresh/', JWTCookieTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogOutAPIView.as_view(), name='logout'),
    path('api/register/', RegisterView.as_view(), name='logout'),
    # --------- MODULE ROUINGS ---------

] + router.urls


websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", ChatConsumer.as_asgi()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

