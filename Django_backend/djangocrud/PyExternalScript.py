from django.conf import settings
import djangocrud.settings as app_settings

#settings.configure(INSTALLED_APPS=app_settings.INSTALLED_APPS,DATABASES=app_settings.DATABASES)

import django
django.setup()

import json
from djangocrud.api.models import Movie,outputplot
import sys

import numpy as np
import matplotlib.pyplot as plt
import math
import PySpice.Logging.Logging as Logging

import sys
import matplotlib.pyplot as plt
'''
#print("hello")
n = len(sys.argv[1])
lst2=list()
for i in sys.argv[1]:
    if i!=" ":
        lst2.append(int(i))


# x axis values 
x = [1,2,-3,2,1] 
# corresponding y axis values 
y = lst2

xa=str(x[0])
for i in range(1,len(x)):
    xa=xa+","+str(x[i])

ya=str(y[0])
for i in range(1,len(y)):
    ya=ya+","+str(y[i])

print(xa+';'+ya,end='')

# plotting the points  
plt.plot(x, y) 
  
# naming the x axis 
plt.xlabel('x - axis') 
# naming the y axis 
plt.ylabel('y - axis') 
  
# giving a title to my graph 
plt.title('My first graph!') 
  
# function to show the plot 
plt.show()
'''
def func33():
    print("hello")
    print("yes")
    o=outputplot.objects.get(outputplot_id=1)
    print(o.x)
    print(o.y)
