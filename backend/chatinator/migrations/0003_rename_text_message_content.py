# Generated by Django 5.0.7 on 2024-08-30 23:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatinator', '0002_alter_message_conversation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='text',
            new_name='content',
        ),
    ]
