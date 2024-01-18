from django.contrib import admin
from .models import Episode, Episode_Link

class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('episode_num', 'episode_title', 'episode_date', 'episode_audio_url', 'episode_descript', 'episode_acts',)

class EpisodeLinksAdmin(admin.ModelAdmin):
    list_display = ('episode_link_num', 'episode_link_url')

# Register your models here.

admin.site.register(Episode, EpisodeAdmin)
admin.site.register(Episode_Link, EpisodeLinksAdmin)



