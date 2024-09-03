from rest_framework import viewsets
from rest_framework.response import Response

from .models import Account
from .serializer import AccountSerializer
from .schema import user_list_docs


class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()

    @user_list_docs
    def list(self, request):

        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)

        return Response(serializer.data)

