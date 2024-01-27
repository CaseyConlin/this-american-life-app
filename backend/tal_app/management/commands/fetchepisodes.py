from django.core.management.base import BaseCommand, CommandError
from tal_app.models import Episode as episode_model
from tal_app.models import Episode_Link as episode_link
from bs4 import BeautifulSoup
import requests
import json
from datetime import datetime 
from concurrent.futures import ThreadPoolExecutor
from requests_ip_rotator import ApiGateway
import environ

env = environ.Env()
environ.Env.read_env()



class Command(BaseCommand):

    def handle(self, *args, **options):
        episode_links = episode_link.objects.all().order_by('-episode_link_num')
        newEpisodes = []
       

            
        def get_episodes_data(link_object):
            
            if episode_model.objects.filter(episode_num = link_object.episode_link_num).exists():
                return
            
            else:
                new_episode = (get_episode_data('https://www.thisamericanlife.org' + link_object.episode_link_url))
                newEpisodes.append(new_episode)
            print(len(newEpisodes))

        def get_episode_data(link):
            AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
            AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')

            gateway = ApiGateway('https://www.thisamericanlife.org', 
                                 access_key_id= AWS_ACCESS_KEY_ID, 
                                 access_key_secret=AWS_SECRET_ACCESS_KEY)
            gateway.start()
            session = requests.Session()
            session.mount('https://www.thisamericanlife.org', gateway)

            response = session.get(link)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)
            soupScript = BeautifulSoup(data, 'html5lib')
            info = json.loads(soupScript.find(id='playlist-data').string)
    
            num = info['episode']
            title = soup.h1.get_text() if soup.h1.get_text() is not None else str(soup.h1)
            date = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y")
            audio = info['audio']
            desc = soup.select_one('div.field-type-text-with-summary div.field-items div.field-item.even p').get_text() if soup.select_one('div.field-type-text-with-summary div.field-items div.field-item.even p') is not None else 'No description available.'
            acts = info['acts'] if 'acts' in info else[{"name":"Act One: Act One","summary":"No summary available.","number":0,"timestamp":0,"byline":"This American Life"}]

            print(num)

            try:

                newEpisode = episode_model(episode_num = num, 
                                           episode_title = title, 
                                           episode_date = date, 
                                           episode_audio_url = audio, 
                                           episode_descript = desc, 
                                           episode_acts = acts)

                return newEpisode

            except Exception as e:
                print(e)
                pass

            gateway.shutdown()        

            
        
        with ThreadPoolExecutor(max_workers=50) as executor:
            for ep in episode_links:
                executor.submit(get_episodes_data, ep)
               
        for episode in newEpisodes:
            try:
                episode.save()
            except Exception as e:
                print(e)
                pass





