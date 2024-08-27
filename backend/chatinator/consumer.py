from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        self.send(text_data="This is a reply from the server")
        self.close()

    def disconnect(self, close_code):
        # Called when the socket closes
        pass
