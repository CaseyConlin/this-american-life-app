from django.core.management.base import BaseCommand, CommandError
# from polls.models import Question as Poll
from tal_app.models import Episode_Link as episode_link
from bs4 import BeautifulSoup
import requests
from time import sleep
import json
from datetime import datetime 
from requests_ip_rotator import ApiGateway, EXTRA_REGIONS
import os
from dotenv import load_dotenv

import environ

env = environ.Env()
environ.Env.read_env()


class Command(BaseCommand):
    help = "Fetch episode links from url api"

    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)
    def handle(self, *args, **options):
        query_url = 'https://www.thisamericanlife.org/archive?page='


        # from django.apps import apps


        # A = apps.get_model('tal_app', 'Episode')
        # Episode = A()


        def get_episode_links(url, pageNumberStart, urlEnd):
            # existing_episodes = episode_link.objects.all().order_by('-episode_link_num')
            # missing_ep_ranges = []
            # for i in range(len(existing_episodes)):
            #     if existing_episodes[i] - 1 > existing_episodes[i+1]:
            #         missing_ep_ranges.append([existing_episodes[i], existing_episodes[i+1]])
            # while len(missing_ep_ranges) > 0:
            #     # //641-601 819=1 772=2
            #     pageCheck = min(missing//48)

            

            pageNumber = pageNumberStart
            lastUrl = urlEnd
            links = set()
            cleanLinks = []
            endSearch = False
            while endSearch != True:

                AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
                AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
                # AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
                # AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

                gateway = ApiGateway('https://www.thisamericanlife.org', access_key_id= AWS_ACCESS_KEY_ID, access_key_secret=AWS_SECRET_ACCESS_KEY)
                gateway.start()
                session = requests.Session()
                session.mount('https://www.thisamericanlife.org', gateway)

                response = session.get(url+str(pageNumber))
                # response = requests.get(url+str(pageNumber))
                data = response.text
                soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)

                for link in soup.find_all('a'):
                    link_url = link.get('href')
                    link_class = link.get('class')

                    if link_class is not None and link_class == 'goto goto-episode':
                        if link_url is not None:
                            links.add(link_url)
                        if link_url == urlEnd or link_url == '/1/new-beginnings':
                            endSearch = True


                if endSearch != True: 
                    pageNumber+=1

                sleep(20)

            for link in links:
                ep_number = link.split('/')[1]

                newLink = link
                print(newLink)
                cleanLinks.append([int(ep_number),newLink])

            # sortedLinks = sorted(links)
            # print(sortedLinks)
            cleanLinks.sort()
            print(cleanLinks)
    
            for link in cleanLinks:
                # print(link[0], link[1])
                if episode_link.objects.filter(episode_link_num = link[0]).exists():
                    continue
                else:
                    newEpisodeLink = episode_link(episode_link_num = link[0], episode_link_url = link[1])
                    newEpisodeLink.save()
            # write_to_file(cleanLinks)
            return links


        # def get_audio_links(links):
        #     response = requests.get(links)
        #     data = response.text
            
        #     soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)

        #     soupScript = BeautifulSoup(data)
        #     info = json.loads(soupScript.find('script', id='playlist-data').string)
        #     # print(info)
        #     # print(info['episode'])
        #     print(soup.h1.string)
        #     print(datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"))
        #     print(soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p").string)
        #     print(info['title'])
        #     print(info['audio'])
        #     print(info['acts'])
        #     for act in info['acts']:
        #         print(act['name'])
            

        #     newEpisode = episode(episode_num = info['episode'],  episode_title = soup.h1.string, episode_date = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"), episode_audio_url = info['audio'], episode_descript = soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p").string, episode_acts = info['acts'])
        #     newEpisode.save()
        # episode_num = soup.h1.string, 
        # episode_title = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"), 
        # episode_date = soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p").string, 
        # episode_audio_url = info['title'], 
        # episode_descript = info['audio'], 
        # episode_acts = info['acts'], 
                # question_text="What's new?", pub_date=timezone.now())


            # episode_data = set()

            # for link in range(links):
            #     episode = {}
            #     response = requests.get(link)
            #     data = response.text
            #     soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)
            #     link_url = link.get('href')
            #     link_class = link.css('play')
            #     link_title = link.get('h1')
            #     if link_class is not None and link_class == 'goto goto-episode':
            #             if link_url is not None:
            #                 episode[title] = link_title
            #                 episode[number] = link_number
            #                 episode[link] = link_url

            #                 links.add(link_url + '\n')


        # def item_generator(things):
        #     for item in things:
        #         yield str(item)
        #         yield '\n'

        # def write_to_file(links):
        #     with open('data.txt', 'a') as f:
        #         f.writelines(item_generator(links))

        # 20 pages 1/11/2024

        # get_links('https://www.thisamericanlife.org/archive')
        get_episode_links(query_url, 0, '/1/new-beginnings')
                
        # get_audio_links('https://www.thisamericanlife.org/423/the-invention-of-money')





