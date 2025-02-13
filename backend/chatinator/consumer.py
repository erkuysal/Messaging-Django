from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from .models import Message, Conversation

from django.contrib.auth import get_user_model

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.user = self.scope['user']

        self.accept()

        if not self.user.is_authenticated:
            self.close(code=4001)

        self.channel_id = self.scope['url_route']['kwargs']['channelId']
        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(
             self.channel_id,
             self.channel_name
        )

    def receive_json(self, content=None, bytes_data=None):
        channel_id = self.channel_id
        sender = self.user
        message = content['message']

        conversation, created = Conversation.objects.get_or_create(channel_id=channel_id)

        new_message = Message.objects.create(conversation=conversation, sender=sender, content=message)

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                'type': 'chat.message',
                'new_message': {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.time_stamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)


