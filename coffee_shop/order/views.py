from django.http import HttpResponse
from django.shortcuts import render
import json
from django_socketio.events import on_message


def index(request):
    context = {'order_detail':"hihi" }
    return render(request, 'order/index.html', context)

def order(request):

    key =  request.GET.get('name', None)
    print key
    results=json.dumps({
        'status':"success"
    })
    return HttpResponse(results, content_type='application/json')


@on_message
def my_message_handler(request, socket, context, message):
    print "socket"
    return