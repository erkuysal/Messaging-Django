from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin


from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from server.views import CategoryListViewSet, ServerListViewSet
from chatinator.consumer import ChatConsumer
from chatinator.views import MessageViewSet


router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="messages")

urlpatterns = [
    path('admin/', admin.site.urls),

    # --------- API VIEWS ----------
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/schema/ui', SpectacularSwaggerView.as_view()),

    # --------- MODULE ROUINGS ---------

] + router.urls


websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", ChatConsumer.as_asgi()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

