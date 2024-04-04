#ITEMS_API_PRICES==============
# {
# 	ItemName: Bloodletter
#   CraftingTax: 20s
#   Recepie{
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

import api_item
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

info_file   = open("InputFiles/python/output/json/items_info_list.json","r")
api_file    = open("InputFiles/python/output/json/api_prices.json","r")
cities_file = open("InputFiles/python/output/json/cities.json","r")
out         = open("InputFiles/python/output/json/api_items_price.json","w")
info_json   = json.load(info_file)
api_json    = json.load(api_file)
cities_json = json.load(cities_file)
items       = tuple(info_json.items())

out.write("{\n")
for i in info_json:
    item_value = 0
    usage_fee  = 0
    crafting_tax = ((item_value*0.1125)*usage_fee)/100
    city_craft = assign_city(info_json[i]["category"])

    api_item_obj = api_item.ApiItem(i,info_json[i]["item_ign"], info_json[i]["item_value"],
                                    info_json[i]["weight"],info_json[i]["recepie"],
                                    info_json[i]["recepie_amounts"],info_json[i]["category"],
                                    info_json[i]["crafting_station"],crafting_tax, 1, 1,1,100,
                                    100,"Lymhurst", "Caerleon",city_craft)
    string =  api_item_obj.toJSON()
    if items[len(items)-1][0] == i:
        out.write(string[2:-2]+"\n")
    else:
        out.write(string[2:-2]+",\n")
out.write("}")

t2 = time.time()
print(t2-t1)
