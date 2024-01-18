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

from requests_ip_rotator import ApiGateway, EXTRA_REGIONS





class Command(BaseCommand):
    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *args, **options):
        episode_links = episode_link.objects.all().order_by('-episode_link_num')
        # episode_links = episode_link.objects.all().filter(episode_link_num =205)


        def get_episodes_data(link_objects, url):
            # print(link_objects)
            new_episodes = []
            for link_object in link_objects:
                # print(url+link_object.episode_link_url)
                if episode_model.objects.filter(episode_num = link_object.episode_link_num).exists():
                    continue
                else:
                    new_episode = (get_episode_data(url + link_object.episode_link_url))
                    new_episode.save()
                    
            print(new_episodes)

        def get_episode_data(link):
            AWS_ACCESS_KEY_ID = os.getenv(AWS_ACCESS_KEY_ID)
            AWS_SECRET_ACCESS_KEY = os.getenv(AWS_SECRET_ACCESS_KEY)

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

            num = info['episode']
            title = soup.h1.string if soup.h1.string is not None else soup.h1
            date = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y")
            audio = info['audio']
            desc = str(soup.select_one('div.field-type-text-with-summary div.field-items div.field-item.even p'))
            acts = info['acts'] if info['acts'] is not None else {"'NoData": {}}
            # num = 591
            # title = "Test Title"
            # date = datetime(2023,1,1)
            # audio = "stringtest"
            # desc = "string stest"
            # acts = {"'NoData": {}}



            # print(info['episode'])
            # print(soup.h1.string)
            # print(datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"))
            # print("eeeeeeeeeeeeee")
            # print(soup)
            # print(soup.css.select_one(".field.field-name-body.field-type-text-with-summary").find('p'))
            # print(soup.css.select_one(".field.field-name-body.field-type-text-with-summary p"))

            # print(info['title'])
            # print(info['audio'])
            # print(info['acts'])
            # for act in info['acts']:
            #     print(act['name'])

            # this_episode_num = info['episode'] if info['episode'] else 0
            
            # this_episode_title = soup.h1.string if soup.h1 else "No Title"

            # this_episode_date = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y") if datetime.strptime else datetime(2001, 1, 1)
            
            # this_episode_audio_url = info['audio'] if info['audio'] else "No Audio URL"

            # this_episode_descript = soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p") if soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p") else "No Description Available"
            
            # this_episode_acts = info['acts'] if info['acts'] else json.dumps({"'NoData": {}})
            

            

            print(num)
            # print(title)
            # print(date)
            # print(audio)
            # print(desc)
            # print(acts)
            try:
                # print('hye')
                # newEpisode = episode(episode_num = this_episode_num, episode_title = this_episode_title, episode_date = this_episode_date, episode_audio_url = this_episode_audio_url, episode_descript = this_episode_descript, episode_acts = this_episode_acts)
                newEpisode = episode_model(episode_num = num, episode_title = title, episode_date = date, episode_audio_url = audio, episode_descript = desc, episode_acts = acts)
                # print('eeeeeeeeee')
                print(newEpisode)
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
        get_episodes_data(episode_links, 'https://www.thisamericanlife.org')  

                





