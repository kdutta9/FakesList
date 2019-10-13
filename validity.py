from datascience import *
import numpy as np

headphone = Table().read_table('headphone.csv')
designer = Table().read_table('designer.csv')
makeup = Table().read_table('makeup.csv')
coin = Table().read_table('coin.csv')
jersey = Table().read_table('jersey.csv')
computer = Table().read_table('computer.csv')
laptop = Table().read_table('laptop.csv')
purse = Table().read_table('purse.csv')
watch = Table().read_table('watch.csv')
movie = Table().read_table('movie.csv')
shoe = Table().read_table('shoe.csv')
jewelry = Table().read_table('jewelry.csv')
wallet = Table().read_table('wallet.csv')
smartphone = Table().read_table('smartphone.csv')
wine = Table().read_table('wine.csv')

datasets = [headphone, designer, makeup, coin, jersey,
         computer, laptop, purse, watch, movie,
         shoe, jewelry, wallet, smartphone, wine]
items = ['headphone', 'designer', 'makeup', 'coin', 'jersey',
         'computer', 'laptop', 'purse', 'watch', 'movie',
         'shoe', 'jewelry', 'wallet', 'smartphone', 'wine']
keywords = ['agent', 'wire', 'transfer', 'paypal', 'escrow', 'estate']

def get_items():
    return items

def validity(item, price, desc):
    item = item.lower()
    assert (item in items)
    d = {}

    for i in range(len(items)):
        if item == items[i]:
            avg_price = np.mean(datasets[i].column(0))
            lower_bound = np.median(datasets[i].column(0)) - (1 * np.std(datasets[i].column(0)))
            if lower_bound <= 0:
                lower_bound = 1
            d = {'average price': avg_price, 'lower bound': lower_bound, 'this item price': price,
                 'desc': desc, 'keyword': []}
            for word in keywords:
                if word.lower() in desc.lower():
                    d['keyword'] += [word]

    return d
