import json
import time
import recipe

t1 = time.time()

api_prices_file  = open("InputFiles/python/output/json/api_items_price.json","r")
out              = open("InputFiles/python/output/json/proccessed_items.json","w")
api_prices_json  = json.load(api_prices_file)

out.write("{\n")
output = ""
rpe    = []

for i in api_prices_json:
    if recipe.items_recipe.get(i) is not None:
        rpe = recipe.items_recipe[i]
    if recipe.materials_recipe.get(i) is not None:
        rpe = recipe.materials_recipe[i]
    if rpe == []:
        continue

    json_obj = {i:{
        "id"    :        api_prices_json[i]["id"],
        "ign"   :        api_prices_json[i]["ign"],
        "weight":        api_prices_json[i]["weight"],
        "recipe":        rpe,
        "city_sell":     api_prices_json[i]["city_buy"],
        "city_buy":      api_prices_json[i]["city_sell"],
        "price_buy":     api_prices_json[i]["price_buy"],
        "price_sell":    api_prices_json[i]["price_sell"],
        "city_craft":    api_prices_json[i]["city_craft"],
        "revision_sell": api_prices_json[i]["revision_sell"],
        "revision_buy":  api_prices_json[i]["revision_buy"],
        "quality":       api_prices_json[i]["quality"], 
        "crafting_tax":  api_prices_json[i]["crafting_tax"]

    }}

    str     = json.dumps(json_obj,indent=4)
    str     = str[2:-2]
    str     += ",\n"
    output  += str

output = "".join(output.rsplit(",", 1))
out.write(output) 
out.write("}")

t2 = time.time()
print(t2-t1)
