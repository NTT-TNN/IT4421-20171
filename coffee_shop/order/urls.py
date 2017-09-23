from django.conf.urls import url
from django.conf.urls import include, url

from . import views

urlpatterns = {
    url(r'^$', views.index, name='index'),
    url(r'order', views.order, name='order'),
    # url("^socket\.io", include('django_socketio.urls')),
}