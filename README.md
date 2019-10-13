# FakesList

## Summary
Fakeslist is a website for users looking to avoid scams on Ebay. Users input a URL of a specific Ebay product listing they are interested in purchasing, and Fakeslist evaluates the product price against similar item prices and checks its description for keyword signs of possible scams, and displays metrics on the likelihood of the listing being a scam. 

Currently, products in categories 'coin', 'computer', 'designer', 'headphone', 'jersey', 'jewelry', 'laptop', 'shoe', 'smartphone', 'wallet', 'watch', 'wine' have supported dataset gathering. These are commonly scammed items for sellers on Ebay. 

The website frontend is built in standard JavaScript with a Flask backend. Web scraping is done with Python requests, bs4, Jupyter Notebook, and urllib. Data science tools used include pandas and numpy. 

## Running FakesList
Must have Python3 installed with following libraries: flask, datascience, bs4, requests, nltk (must run nltk.download in Python to download NLP nets, only need WordNet package). In terminal call `flask run` inside the project and go to URL `http://127.0.0.1:5000/` on Chrome Incognito. Enter the URL of any specific product listing on Ebay. 
