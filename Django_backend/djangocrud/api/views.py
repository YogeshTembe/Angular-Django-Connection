from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import MovieSerializer,MovieMiniSerializer,outputplotSerializer
from .models import Movie,outputplot
from rest_framework.response import Response
from django.http import HttpResponse
import sys
from subprocess import run,PIPE

class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def list(self,request,*args,**kwargs):
        movies=Movie.objects.all()
        serializer=MovieMiniSerializer(movies,many=True)
        return Response(serializer.data)

class outputplotViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = outputplot.objects.all()
    serializer_class = outputplotSerializer


def func(request):
    movies=Movie.objects.all()
    serializer=MovieSerializer(movies,many=True)
    #print(serializer.data)
    lstid=""
    lsttitle=""
    for i in serializer.data:
        for key,value in i.items():
            if key=="id":
                lstid=lstid+" "+str(value)
            if key=="title":
                lsttitle=lsttitle+" "+value
    out=run([sys.executable,'C:\\Users\\Rakesh Tembe\\Desktop\\PyExternalScript.py',lstid],shell=False,stdout=PIPE)
    xa,ya=out.stdout.decode("utf-8").split(';')
    print(xa,ya)
    outputplot.objects.all().delete()
    outputplot.objects.update_or_create(outputplot_id=1,x=xa,y=ya)
    #plot1 = outputplot(outputplot_id=1, x=xa,y=ya)
    #plot1.save()
    return HttpResponse()

    

