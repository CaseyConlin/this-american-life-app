# Generated by Django 5.0.1 on 2024-01-15 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tal_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='episode',
            name='episode_audio_url',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
