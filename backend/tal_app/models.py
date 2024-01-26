from django.db import models

# Create your models here.
class Episode(models.Model):
    episode_num = models.IntegerField(primary_key=True )
    episode_title = models.CharField(max_length=500, blank = True)
    episode_date = models.DateField('date published', blank = True)
    episode_audio_url = models.CharField(max_length=500, blank = True)
    episode_descript = models.CharField(max_length=1000, blank = True)
    episode_acts = models.JSONField(blank=True)

    class Meta:
        ordering = ['-episode_num']

    def _str_(self):
        return self.episode_num
    
class Episode_Link(models.Model):
    episode_link_num = models.IntegerField(primary_key=True)
    episode_link_url = models.CharField(max_length=500)
    class Meta:
        ordering = ['-episode_link_num']


    def _str_(self):
        return self.episode_link_num
    
