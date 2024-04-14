'''the final .json file which will be 
transmited to the web application'''
'''
the ITEMS_FILE has the following structure:
    Item:{
    id:*,
    ign:*,
    item_value:*
    weight:*,
    recipe:{
        buy:[
        *item arrays*
        [Name,City,amount,Price]
        ],
        craft:[
        *item arrays*
        [Crafted_Amount,Buy_Price,Crafting_Tax]
        ]
    },
    Category:*,
    crafting_station:*,
    Quality: *,
    Crafting_tax: *,
    Revision_buy:*,
    Revision_sell:*,
    Price_sell:*,
    Price_buy:*,
    City_sell:*,
    City_buy:*,
    City_craf":*
    }
where "*" denotes any possible value
'''
import sys
import json
sys.path.append('../city_travel_cost')
import class_mount 
import useful_functions
ITEMS_FILE="../../output/json/api_items_prices.json"
OUTPUT_FILE="../../output/json/final.json"
investment=20000#from web application
mount_load_capacity=1000##from web application
player_mount=class_mount.Mount(4,0.5,0.85,1000)#from web application
#=======================================================================================
fin=open(ITEMS_FILE,"r")
items_buffer=json.load(fin)
fin.close()
fout=open(OUTPUT_FILE,"w")
fout.write("[\n")
fout.close()
for item in items_buffer:
    write_buffer={
        "Name:":items_buffer[item]["ign"],
        "City buy":items_buffer[item]["city_buy"],
        "Buy price:":items_buffer[item]["price_buy"],
        "City sell":items_buffer[item]["city_sell"],
        "Sell price:":items_buffer[item]["price_sell"],
        "Craft city":items_buffer[item]["city_craft"],
        "Time:":useful_functions.compute_time(player_mount,items_buffer[item]["city_buy"],items_buffer[item]["city_sell"]),
        "Buy time update:":items_buffer[item]["revision_buy"],
        "Sell time update:":items_buffer[item]["revision_sell"],
        "Carrying capacity:":useful_functions.compute_carrying_capacity(player_mount,items_buffer[item]["weight"]),
        "Recipe:":items_buffer[item]["recipe"],
        "Quality:":1,
        "Profit:":useful_functions.compute_profit(items_buffer[item],investment),
        "ROI:":useful_functions.compute_roi(items_buffer[item]),
        "Index:":useful_functions.compute_index(items_buffer[item])
    }
    write_buffer=json.dumps(write_buffer,indent=4)
    fout=open(OUTPUT_FILE,"a")
    fout.write(write_buffer)
    fout.write("\n,")
    fout.close()
fin=open(OUTPUT_FILE, 'rb+')
fin.seek(-1, 2) 
fin.truncate() #removing "," character for the final item
fin.close()
fout=open(OUTPUT_FILE,"a")
fout.write("\n]\n")
fout.close()