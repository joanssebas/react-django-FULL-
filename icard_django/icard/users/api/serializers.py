from dataclasses import field
from operator import mod
from pyexpat import model
from rest_framework import serializers
from users.models import User

class USerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password','is_active','is_staff']