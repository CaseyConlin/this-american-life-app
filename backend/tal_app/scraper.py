from bs4 import BeautifulSoup
import requests
from time import sleep
import json
from datetime import datetime 
# from models import Episode
# from django.apps import apps


# A = apps.get_model('tal_app', 'Episode')
# Episode = A()
# print(Episode.objects.al())

def get_episode_links(url):
    pageNumber = 0
    links = set()
    cleanLinks = []
    endSearch = False
    while endSearch != True:
        response = requests.get(url+str(pageNumber))
        data = response.text
        soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)

        for link in soup.find_all('a'):
            link_url = link.get('href')
            link_class = link.get('class')

            if link_class is not None and link_class == 'goto goto-episode':
                if link_url is not None:
                    links.add(link_url)
                if link_url == '/1/new-beginnings':
                    endSearch = True


        if endSearch != True: 
            pageNumber+=1

        sleep(15)

    for link in links:
        newLink = link.split('/')
        cleanLinks.append([int(newLink[1]), newLink[2]])

    # sortedLinks = sorted(links)
    # print(sortedLinks)
    cleanLinks.sort()
    # print(cleanLinks)

    write_to_file(cleanLinks)
    return links


def get_audio_links(links):
    response = requests.get(links)
    data = response.text
    
    soup = BeautifulSoup(data, 'html.parser', multi_valued_attributes=None)

    soupScript = BeautifulSoup(data)
    info = json.loads(soupScript.find('script', id='playlist-data').string)
    # print(info)
    print(info['episode'])
    print(soup.h1.string)
    print(datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"))
    print(soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p").string)
    print(info['title'])
    print(info['audio'])
    print(info['acts'])
    for act in info['acts']:
        print(act['name'])
    

    # newEpisode = Episode(episode_num = soup.h1.string, episode_title = datetime.strptime(soup.css.select_one('.date-display-single').string, "%B %d, %Y"), episode_date = soup.css.select_one(".field.field-name-body.field-type-text-with-summary.field-label-hidden p").string, episode_audio_url = info['title'], episode_descript = info['audio'], episode_acts = info['acts'])
    # newEpisode.save()
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


def item_generator(things):
    for item in things:
        yield str(item)
        yield '\n'

def write_to_file(links):
    with open('data.txt', 'a') as f:
        f.writelines(item_generator(links))

# 20 pages 1/11/2024

# get_links('https://www.thisamericanlife.org/archive')
# get_episode_links('https://www.thisamericanlife.org/archive?page=')
        
get_audio_links('https://www.thisamericanlife.org/447/the-incredible-case-of-the-pi-moms')




