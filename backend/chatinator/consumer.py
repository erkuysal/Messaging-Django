from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = "testroom"

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
             self.room_name,
             self.channel_name
        )

    def receive_json(self, content=None, bytes_data=None):
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                'type': 'chat.message',
                'new_message': content['message'],
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        pass
