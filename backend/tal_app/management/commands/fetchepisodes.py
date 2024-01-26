from django.core.management.base import BaseCommand, CommandError
# from polls.models import Question as Poll
from tal_app.models import Episode as episode_model
from tal_app.models import Episode_Link as episode_link
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
from time import sleep
import json
from datetime import datetime 
from multiprocessing.pool import ThreadPool
from concurrent.futures import ThreadPoolExecutor

from requests_ip_rotator import ApiGateway, EXTRA_REGIONS

import environ

env = environ.Env()
environ.Env.read_env()



class Command(BaseCommand):
    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *args, **options):
        episode_links = episode_link.objects.all().order_by('-episode_link_num')
        # episode_links = episode_link.objects.all().filter(episode_link_num =205)
        newEpisodes = []
       
        # def get_ep_data(link, url):
            
        def get_episodes_data(link_object):
            # print(link_objects)
            # new_episodes = []
            # for link_object in link_objects:
                # print(url+link_object.episode_link_url)
            if episode_model.objects.filter(episode_num = link_object.episode_link_num).exists():
                return
            
            # if link_object.episode_link_num == 305:
            #     return
            else:
                new_episode = (get_episode_data('https://www.thisamericanlife.org' + link_object.episode_link_url))
                newEpisodes.append(new_episode)
                # new_episode.save()
                    
            # print(newEpisodes)
            print(len(newEpisodes))
            # for episode in new_episodes:
            #     episode.save()

        def get_episode_data(link):
            AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
            AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
            # AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
            # AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

            gateway = ApiGateway('https://www.thisamericanlife.org', access_key_id= AWS_ACCESS_KEY_ID, access_key_secret=AWS_SECRET_ACCESS_KEY)
            gateway.start()
            session = requests.Session()
            session.mount('https://www.thisamericanlife.org', gateway)

            response = session.get(link)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)
            soupScript = BeautifulSoup(data, 'html5lib')
            # print(soupScript)
            info = json.loads(soupScript.find(id='playlist-data').string)
            # print(info)
            # print('printing!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            # print(info['audio'])
            num = info['episode']
            title = soup.h1.get_text() if soup.h1.get_text() is not None else str(soup.h1)
            date = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y")
            audio = info['audio']
            desc = soup.select_one('div.field-type-text-with-summary div.field-items div.field-item.even p').get_text() if soup.select_one('div.field-type-text-with-summary div.field-items div.field-item.even p') is not None else 'No description available.'
            acts = info['acts'] if 'acts' in info else[{"name":"Act One: Act One","summary":"No summary available.","number":0,"timestamp":0,"byline":"This American Life"}]
            # acts = info['acts'] if 'acts' in info else {"'NoData": {}}
            # [{"name":"Act One: Act One","summary":"No summary available.","number":0,"timestamp":0,"byline":"This American Life"}]

            print(num)

            try:
                # print('hye')
                # newEpisode = episode(episode_num = this_episode_num, episode_title = this_episode_title, episode_date = this_episode_date, episode_audio_url = this_episode_audio_url, episode_descript = this_episode_descript, episode_acts = this_episode_acts)
                newEpisode = episode_model(episode_num = num, 
                                           episode_title = title, 
                                           episode_date = date, 
                                           episode_audio_url = audio, 
                                           episode_descript = desc, 
                                           episode_acts = acts)
                

                


                # newEpisode.save()
                return newEpisode
                # newEpisode.save()
                # print('gottttttttiitiittti')

            except Exception as e:
                print(e)
                pass

            #         # print(info)
            #         # if info is not None: print(info)
            #         # if soup.h1.string is not None: print(soup.h1.string)
            #         pass
            #         # print(info['acts'])
            gateway.shutdown()        

            
        


        # def item_generator(things):
        #     for item in things:
        #         yield str(item)
        #         yield '\n'

        # def write_to_file(links):
        #     with open('data.txt', 'a') as f:
        #         f.writelines(item_generator(links))

        # 20 pages 1/11/2024

        # get_links('https://www.thisamericanlife.org/archive')
        # get_episode_links('https://www.thisamericanlife.org/archive?page=')
        # get_episode_data('https://www.thisamericanlife.org/593/dont-have-to-live-like-a-refugee')
       
       
        # get_episodes_data(episode_links, 'https://www.thisamericanlife.org')  

        with ThreadPoolExecutor(max_workers=50) as executor:
            # newEpisodesData = []
            for ep in episode_links:
                executor.submit(get_episodes_data, ep)
               
        for episode in newEpisodes:
            try:

                episode.save()
            except Exception as e:
                print(e)
                pass

        # results = ThreadPool(20).imap_unor
        # dered(get_episodes_data, episode_links)
        
        # print(results)





