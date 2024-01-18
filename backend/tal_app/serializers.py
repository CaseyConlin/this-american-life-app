from rest_framework import serializers
from .models import Episode, Episode_Link

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        # fields = ('episode_num', 'episode_title', 'episode_date', 'episode_audio_url', 'episode_descript', 'episode_acts')
        fields = ('episode_num', 'episode_title', 'episode_date', 'episode_audio_url', 'episode_descript', 'episode_acts')