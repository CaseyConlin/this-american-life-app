from django.core.management.base import BaseCommand, CommandError
from tal_app.models import Episode_Link as episode_link
from bs4 import BeautifulSoup
import requests
from time import sleep
from requests_ip_rotator import ApiGateway



import environ

env = environ.Env()
environ.Env.read_env()


class Command(BaseCommand):
    help = "Fetch episode links from url api"

    def handle(self, *args, **options):
        query_url = 'https://www.thisamericanlife.org/archive?page='

        def get_episode_links(url, pageNumberStart, urlEnd):
       
            pageNumber = pageNumberStart
            lastUrl = urlEnd
            links = set()
            cleanLinks = []
            endSearch = False
            while endSearch != True:

                AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
                AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')


                gateway = ApiGateway('https://www.thisamericanlife.org', access_key_id= AWS_ACCESS_KEY_ID, access_key_secret=AWS_SECRET_ACCESS_KEY)
                gateway.start()
                session = requests.Session()
                session.mount('https://www.thisamericanlife.org', gateway)

                response = session.get(url+str(pageNumber))

                data = response.text
                soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)

                for link in soup.find_all('a'):
                    link_url = link.get('href')
                    link_class = link.get('class')

                    if link_class is not None and link_class == 'goto goto-episode':
                        if link_url is not None:
                            links.add(link_url)
                        if link_url == urlEnd or link_url == lastUrl:
                            endSearch = True


                if endSearch != True: 
                    pageNumber+=1

                sleep(20)

            for link in links:
                ep_number = link.split('/')[1]

                newLink = link
                print(newLink)
                cleanLinks.append([int(ep_number),newLink])

            cleanLinks.sort()
            print(cleanLinks)
    
            for link in cleanLinks:

                if episode_link.objects.filter(episode_link_num = link[0]).exists():
                    continue
                else:
                    newEpisodeLink = episode_link(episode_link_num = link[0], episode_link_url = link[1])
                    newEpisodeLink.save()

            return links

        get_episode_links(query_url, 0, '/1/new-beginnings')
                






