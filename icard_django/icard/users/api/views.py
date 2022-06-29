from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response

from rest_framework.views import APIView

from users.models import User
from users.api.serializers import USerSerializer


#####################################
#Estos son las peticiones del admin
#####################################

class UserApiViewSet(ModelViewSet):
    permission_classes=[IsAdminUser]
    serializer_class = USerSerializer
    queryset = User.objects.all()

##aqui encriptamos la contra
    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request,*args,**kwargs)

    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password: 
            request.data['password'] = make_password(password)
        
        else:
            request.data['password']=request.user.password
        
        return super().update(request, *args, **kwargs)


#############################################################
#Peticiones de usuarios del restaurante
#############################################################

class USerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        serializer = USerSerializer(request.user)
        return Response(serializer.data)