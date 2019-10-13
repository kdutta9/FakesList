import requests
import sys
from bs4 import BeautifulSoup


def get_listing(url):
	response = requests.get(url)
	soup = None
	if response.ok:
		listing_content = response.content
		soup_clean(listing_content)
	else:
		print('request failed')
	return soup 

def soup_to_dict(listing_content):
	souper = BeautifulSoup(listing_content, 'html.parser')

	span_itemprop_elements = filter(lambda el : el.has_attr('itemprop'), souper.findAll('span'))

	h1_itemprop_elements = filter(lambda el : el.has_attr('itemprop'), souper.findAll('h1'))

	seller_score = filter(lambda el : el.has_attr['alt'] and 'feedback score :' in el['alt'], souper.findAll('span'))
	seller_score = seller_score[0][len('feedback score: ')::]	
	
	listing_table = {
	'name' : list(h1_itemprop_elements)[0],
	'category' :  list(filter(lambda el : el['itemprop'] == 'name'), itemprop_elements)[0],
	'price' : list(filter(lambda el : el['itemprop'] == 'price'), itemprop_elements)[0],
	'description' : get_descsnippet(listing_content),
	'seller_score' : seller_score,
	'seller_rating' : get_sellerrating(listing_content)
	}

	return listing_table

def get_descsnippet(listing_content):
	string_content = listing_content.decode('utf-8')
	start_slice = string_content.index('itemDescSnippet":"\\u003Cp>') 
	start_slice += len('itemDescSnippet":"\\u003Cp>')
	string_content = string_content[start_slice::]
	end_slice = start_slice + 100
	for i in range(0, len(string_content)):
		if (string_content[i] == '\\' and string_content[i + 1] == 'u'):
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

