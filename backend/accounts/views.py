from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Account
from .schema import user_list_docs
from .serializer import AccountSerializer, CustomTokenObtainPairSerializer, JWTCookieTokenRefreshSerializer, RegisterSerializer


def validate_password(password):
    errors = []

    # Define password constraints
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long.")
    if not any(char.isupper() for char in password):
        errors.append("Password must contain at least one uppercase letter.")
    if not any(char.islower() for char in password):
        errors.append("Password must contain at least one lowercase letter.")
    if not any(char.isdigit() for char in password):
        errors.append("Password must contain at least one digit.")
    if not any(char in '!@#$%^&*()_+' for char in password):
        errors.append("Password must contain at least one special character (e.g., !@#$%^&*).")

    return errors


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            forbidden_usernames = ["admin", "root", "superuser"]
            if username in forbidden_usernames:
                return Response({"error": "Username is not Allowed"}, status=status.HTTP_409_CONFLICT)

            password_errors = validate_password(password)
            if password_errors:
                return Response({"errors": password_errors}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        errors = serializer.errors
        if "username" in errors and "non_field_errors" not in errors:
            return Response({"error": "Username already exists."}, status=status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutAPIView(APIView):
    def post(self, request, format=None):
        response = Response("Logged out successfully.")

        response.set_cookie("refresh_token", "", expires=0)
        response.set_cookie("access_token", "", expires=0)

        return response


class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]

    @user_list_docs
    def list(self, request):

        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)

        return Response(serializer.data)


class JWTSetCookieMixin:
    def finalize_response(self, request, response , *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                                response.data["refresh"],
                                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                                httponly=True,
                                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

        if response.data.get("access"):
            response.set_cookie(settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                                response.data["access"],
                                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                                httponly=True,
                                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

            del response.data["access"]

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = JWTCookieTokenRefreshSerializer

