#ITEMS_API_PRICES==============
# {
# 	ItemName: Bloodletter
#   CraftingTax: 20s
#   Recipe{
# 	  Resource1: 20
#     Resource2: 20
#     Artefact: 1000
# 	}
#   Weight: 0.2kg
#   quality: 1
#   Revision: 5 hours ago
#   SellingPrice: 200s
#   BuyingPrice: 200s
#   BuyingCity: Lymhurst
# 	SellingInCity: Caerleon
#   CraftingCity: Lymhurst
# 	Index: 5
# }
#ITEMS_API_PRICES==============
#crafting_tax.push_back(int(((unit.item_value*0.1125)*unit.usage_fee[unit.id])/100));]
#crafting tax = ((item_value*0.1125)*usage fee)/100

import class_api_item
import json
import time

t1 = time.time()

def assign_city(category):
    if category in ["planks","metalbar","cloth","other",
                    "leather","magic_artefact",
                    "ranged_artefact","melee_artefact",
                    "offhand_artefact","armor_artefact"
                    ,"cape","bag",
                    
                    "oregatherer_helmet","oregatherer_backpack","oregatherer_shoes",
                    "oregatherer_armor",

                    "fibergatherer_helmet",
                    "fibergatherer_shoes","fibergatherer_armor","fibergatherer_backpack",

                    "hidegatherer_helmet",
                    "hidegatherer_shoes","hidegatherer_armor","hidegatherer_backpack",

                    "woodgatherer_helmet","woodgatherer_shoes","woodgatherer_armor",
                    "woodgatherer_backpack",

                    "fishgatherer_helmet","fishgatherer_shoes","fishgatherer_armor",
                    "fishgatherer_backpack"]:
         return ""
    if category in ["shield","totem","orb","horn","book","torch"]:
        category = "offhand"
    for i in cities_json:
        for j in cities_json[i]:
            if cities_json[i][j].get(category) is not None:
                return i

    return ""

def get_usage_fee(station):
    if usage_fee_json["usage_fee"].get(station) is not None:
        return usage_fee_json["usage_fee"][station]
    return 0
        
info_file       = open("InputFiles/python/output/json/items_info_list.json","r")
api_file        = open("InputFiles/python/output/json/parsed_prices.json","r")
cities_file     = open("InputFiles/python/output/json/cities.json","r")
site_input_file = open("InputFiles/python/output/json/site_input.json","r")
out             = open("InputFiles/python/output/json/api_items_price.json","w")
info_json       = json.load(info_file)
api_prices_json = json.load(api_file)
cities_json     = json.load(cities_file)
usage_fee_json  = json.load(site_input_file)
items           = tuple(info_json.items())
quality         = 0
revision_buy    = 0
revision_sell   = 0
price_buy       = 0
price_sell      = 0
city_buy        = ""
city_sell       = ""
output          = ""
out.write("{\n")

for i in info_json:

    if api_prices_json.get(i) is not None:
        quality       = api_prices_json[i]["quality"]
        revision_buy  = api_prices_json[i]["revision_buy"]
        revision_sell = api_prices_json[i]["revision_sell"]
        price_buy     = api_prices_json[i]["price_buy"]
        price_sell    = api_prices_json[i]["price_sell"]
        city_buy      = api_prices_json[i]["city_buy"]
        city_sell     = api_prices_json[i]["city_sell"]
    else:
        quality         = 0
        revision_buy    = 0
        revision_sell   = 0
        price_buy       = 0
        price_sell      = 0
        city_buy        = ""
        city_sell       = ""
    item_value = int(info_json[i]["item_value"])
    usage_fee  = get_usage_fee(info_json[i]["crafting_station"])
    crafting_tax = int(((item_value*0.1125)*int(usage_fee))/100)
    if i[1] == "2":
        crafting_tax = 0
    city_craft = assign_city(info_json[i]["category"])


    api_item_obj = class_api_item.ApiItem(i,info_json[i]["item_ign"], item_value,
                                    float(info_json[i]["weight"]),info_json[i]["recipe"],
                                    info_json[i]["category"],info_json[i]["crafting_station"],
                                    crafting_tax, quality,revision_sell, revision_buy, 
                                    price_sell, price_buy, city_sell, city_buy,city_craft)
    if api_item_obj.price_buy != 0 and api_item_obj.price_sell != 0:
        string =  api_item_obj.toJSON()
        output += (string[2:-2]+",\n")

output = "".join(output.rsplit(",", 1))
out.write(output)
out.write("}")

t2 = time.time()
print(t2-t1)
