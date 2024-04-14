import json

file1 = open("InputFiles/python/output/text/items_id.txt","r")
file2 = open("InputFiles/python/output/text/items_ign.txt","r")
file3 = open("InputFiles/python/output/text/items_iv.txt","r")
file4 = open("InputFiles/python/output/text/items_recipe.txt","r")
file5 = open("InputFiles/python/output/text/items_weight.txt","r")
file6 = open("InputFiles/python/output/text/items_crafting_amount.txt","r")
file7 = open("InputFiles/python/output/text/items_weight.txt","r")
file8 = open("InputFiles/python/output/text/items_category.txt","r")
file9 = open("InputFiles/python/output/text/items_crafting_station.txt","r")
out   = open("InputFiles/python/output/json/items_info_list.json","w")

ids      = []
igns     = []
ivs      = []
recipes  = []
weights  = []
amounts  = []
units    = []
category = []
crafting_station = []

for i in file1:
    ids.append(i[:-1])
for i in file2:
    igns.append(i[:-1])
for i in file3:
    ivs.append(i[:-1])
for i in file4:
    recipes.append(i[:-1])
for i in file5:
    weights.append(i[:-1])
for i in file6:
    amounts.append(i[:-1])
for i in file7:
    weights.append(i[:-1])
for i in file8:
    category.append(i[:-1])
for i in file9:
    crafting_station.append(i[:-1])

for i in range(0,len(ids)):
    item_value = ivs[i]
    if str(ivs[i]).find("k") != -1:
        item_value = int(float(ivs[i][:-1])*1000)
    recipe = str(recipes[i]).split(" ")
    recipe = [] if recipes[i] == "o" else recipe
    amount = str(amounts[i]).split(" ")
    amount = [] if amounts[i] == "o" else amount
    final_recipe = {}
    for j in range(0,len(recipe)):
        final_recipe[recipe[j]]={"amount":amount[j]}
    unit = {
        ids[i]:{
            "item_ign": igns[i],
            "category": category[i],
            "crafting_station": crafting_station[i],
            "item_value": str(item_value),
            "weight": weights[i],
            "recipe": final_recipe,
        }
    }
    units.append(unit)

out.write("{\n")
for i in units:
    str = json.dumps(i,indent=4)
    last_item = tuple(units[len(units)-1].items())[0][0]
    current_item = tuple(i.items())[0][0]
    if last_item == current_item:
        out.write(str[2:-2]+"\n")
    else:
        out.write(str[2:-2]+",\n")
out.write("}")

