import logging

from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin
from socketio.sdjango import namespace

@namespace('/order')
class ChatNamespace(BaseNamespace, RoomsMixin, BroadcastMixin):
    nicknames = []

    def initialize(self):
        self.logger = logging.getLogger("socketio.chat")
        self.log("Socketio session started")
        
    def log(self, message):
        self.logger.info("[{0}] {1}".format(self.socket.sessid, message))


    def on_order(self, msg):
        print msg
        return True
