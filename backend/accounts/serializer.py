from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', )  # Must be tuple or list


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(self, user):
        token = super().get_token(user)

        token["example"] = "example"

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id

        return data
