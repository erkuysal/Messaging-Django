from django.db.models import Count

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated

from .schema import server_list_docs
from .models import Server
from .serializer import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):

    queryset = Server.objects.all()
    #permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request):
        """
            Retrieves and filters a list of servers based on query parameters.

            This method processes various query parameters to filter and return
            a list of servers. The following query parameters are supported:

            - `category`: Filters servers by the specified category name.
            - `qty`: Limits the number of servers returned to the specified quantity.
            - `by_user`: If set to "true", filters servers associated with the authenticated user.
            - `by_serverid`: Filters servers by the specified server ID.
            - `with_num_members`: If set to "true", includes the number of members in each server.

            Args:
                request: The HTTP request object containing query parameters.

            Raises:
                AuthenticationFailed: If `by_user` or `by_serverid` is specified and the user is not authenticated.
                ValidationError: If `by_serverid` is specified but the server ID is invalid or does not exist.

            Returns:
                Response: A response object containing the serialized list of servers.

            Example:
                Assuming the view is called via an endpoint, an example URL could be:

                GET /api/servers/?category=gaming&qty=10&by_user=true&with_num_members=true

                This would filter servers in the "gaming" category, limit the results to 10 servers,
                include only servers associated with the authenticated user, and include the number
                of members in each server.
        """
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == "true"
        by_serverid = request.query_params.get('by_serverid')
        with_num_members = request.query_params.get('with_num_members') == "true"

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed(detail="You must be authenticated to access this resource")

        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count('member'))

        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed(detail="You must be authenticated to access this resource")

            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_serverid} does not exist")
            except ValueError:
                raise ValidationError(detail="Invalid server id")

        if qty:
            self.queryset = self.queryset[:int(qty)]

        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)


