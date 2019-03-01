from .models import Client
from rest_framework import serializers, viewsets


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('name',)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # allowed_methods = ('GET',)
