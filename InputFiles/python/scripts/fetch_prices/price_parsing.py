import json
import os
from datetime import datetime
PRICE_PERCENTAGE=0.3
PRICES_FILE="../../output/json/fetched_prices.json"
PARSED_PRICES_FILE="../../output/json/parsed_prices.json"
NUM_CITIES=6#number of cities=number of instances when an item appears on the prices file
fin=open(PRICES_FILE,"r")
prices_list=json.load(fin)
fin.close()
#NOTE:Black Market and Merlyn's Rest are not taken into account
#the time specified in "fetched_prices.json" is in ISO 8601 format
def search_min_sell(index):
    min_sell_price=9999999999
    sell_date="1989"
    city_buy="Aiud"
    for i in range(NUM_CITIES):
        if (min_sell_price>prices_list[index+i]["sell_price_min"] )and (prices_list[index+i]["sell_price_min"] >0):
            min_sell_price=prices_list[index+i]["sell_price_min"]
            sell_date=prices_list[index+i]["sell_price_min_date"]
            sell_date=datetime.fromisoformat(sell_date)#converting string to ISO 8601 date
            city_buy=prices_list[index+i]["city"]
    return (min_sell_price,sell_date,city_buy)
def search_max_buy(index):
    max_sell_price=-9999999999
    buy_date="1989"
    city_sell="Aiud"
    for i in range(NUM_CITIES):
        if max_sell_price<prices_list[index+i]["buy_price_max"]:
            max_sell_price=prices_list[index+i]["buy_price_max"]
            buy_date=prices_list[index+i]["sell_price_min_date"]
            buy_date=datetime.fromisoformat(buy_date)#converting string to ISO 8601 date
            city_sell=prices_list[index+i]["city"]
    return(max_sell_price,buy_date,city_sell)
#================================================================================================
'''
    Due to the fact that the "fetched_prices.json" has the items placed in order
    (eg:6 instances "T2_WOOD" in series and after that other 6 instances of other items),
    parsing the file can be done by incrementing with six(or how many cities/places are to be considered)
    and then to acces the id
'''
index=0
fout=open(PARSED_PRICES_FILE,"w")
fout.write("{\n")
indices=len(prices_list)
while index<indices:
    buy_data=search_min_sell(index)
    sell_data=search_max_buy(index)
    if (buy_data[0]>sell_data[0]*PRICE_PERCENTAGE and buy_data[0]<sell_data[0]) and (sell_data[0] >0):
        #filtering out items whoose prices are null
        #or are too big
        temp={prices_list[index][ "item_id"]:{
            "price_buy":buy_data[0],
            "price_sell":sell_data[0],
            "revision_buy":str(int((datetime.now()-buy_data[1]).seconds/60)),
            "revision_sell":str(int((datetime.now()-sell_data[1]).seconds/60)),
                            #the time difference is converted into minutes,then into a string
            "quality":1,
            "city_buy":buy_data[2],
            "city_sell":sell_data[2]
        }}
        temp=json.dumps(temp,indent=4)
        # the opening and closing "{}" are removed from the list in order to format it properly
        if index <indices-6 :
            temp=temp[2:-2]+"\n,"    
        fout.write(temp)
    index=index+NUM_CITIES
fout.close()
with open(PARSED_PRICES_FILE, 'rb+') as fin: 
    fin.seek(-1, 2) 
    fin.truncate() #removing "," character for the final item
fin.close()
fout=open(PARSED_PRICES_FILE,"a")
fout.write("}") #closing the .json file
fout.close()