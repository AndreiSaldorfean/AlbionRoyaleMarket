#this script uses the items.json file to assign a category to the items
import json

def find_index(id,container):
    for i in range(0,len(container)):
        if id == container[i]["@uniquename"]:return i
    return -1

dump_file    = open("InputFiles/python/output/json/items.json","r")
item_id_file = open("InputFiles/python/output/text/items_id.txt","r")
out          = open("InputFiles/python/output/text/items_category.txt","w")
dump_json       = json.load(dump_file)
categories      = ["equipmentitem","weapon","simpleitem"]
items_category  = {}


items_id = []
for i in item_id_file:
    items_id.append(i[:-1])

for i in items_id:
    temp = i
    if i[-2] == "@":
        temp=i[:-2]
    for j in categories:
        index = find_index(temp,dump_json["items"][j])
        if index != -1:
            items_category[i]=dump_json["items"][j][index]["@shopsubcategory1"]
            break

for i in items_id:
    out.write(items_category[i]+"\n")
