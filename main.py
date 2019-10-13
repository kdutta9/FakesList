import requests
import sys
from bs4 import BeautifulSoup
import re

def get_listing(url):
    response = requests.get(url)
    soup = None
    if response.ok:
        listing_content = response.content
        return soup_to_dict(listing_content)
    else:
        print('request failed')
    return soup 

def soup_to_dict(listing_content):
    souper = BeautifulSoup(listing_content, 'html.parser')

    span_itemprop_elements = filter(lambda el : el.has_attr('itemprop'), souper.findAll('span'))

    h1_itemprop_elements = filter(lambda el : el.has_attr('itemprop'), souper.findAll('h1'))
    
    listing_table = {
    'name' : get_itemname(listing_content),
    'category' : list(span_itemprop_elements)[1].string,
    'price' : get_price(listing_content),
    'description' : get_descsnippet(listing_content),
    'seller_rating' : get_sellerrating(listing_content)
    }

    return listing_table
def get_price(listing_content):
    string_content = listing_content.decode('utf-8')
    print(string_content)
    start_slice = string_content.index('itemprop="price" ') 
    start_slice += len('itemprop="price" content="')
    end_slice = start_slice
    while (string_content[end_slice] != '.'):
        end_slice += 1
    price = string_content[start_slice:end_slice + 3:]
    price = price.split('"')[1]
    return price 

def get_feedbackscore(listing_content):
    string_content = listing_content.decode('utf-8')
    start_slice = string_content.index('feedback score') 
    #start_slice += len('feedback score: ')
    end_slice = start_slice
    for i in range(0, len(string_content)):
        if (string_content[i] == '"' and string_content[i + 1] == '>'):
            end_slice = i 
            break
    feedbackscore = string_content[start_slice:end_slice:]
    return feedbackscore

def get_itemname(listing_content):
    string_content = listing_content.decode('utf-8')
    end_slice = string_content.index('</h1>')
    for i in reversed(range(0, end_slice)):
        if string_content[i] == '>' and string_content[i - 1] == 'n':
            start_slice = i + 1
            break
    itemname = string_content[start_slice:end_slice:]
    return itemname

def get_descsnippet(listing_content):
    string_content = listing_content.decode('utf-8')
    start_slice = string_content.index('itemDescSnippet":') 
    start_slice += len('itemDescSnippet":')
    string_content = string_content[start_slice::]
    end_slice = start_slice + 100
    for i in range(0, len(string_content)):
        if (string_content[i] == '"' and string_content[i + 1] == ','):
            end_slice = i 
            break
    descsnippet = string_content[:end_slice:]
    return descsnippet

def get_sellerrating(listing_content): 
    string_content = listing_content.decode('utf-8')
    start_slice = string_content.index('"si-fb" >')
    start_slice += len('"si-fb" >')
    end_slice = start_slice + 30
    end_slice -= len('%&nbsp;Positive feedback</')
    seller_rating = string_content[start_slice:end_slice:]
    return seller_rating
d = get_listing(sys.argv[1])
print(d)