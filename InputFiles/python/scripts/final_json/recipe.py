import time
import json
t1 = time.time()

api2_file   = open("InputFiles/python/output/json/api_items_price.json","r")
api2_json   = json.load(api2_file)

def find_recipe(dict,i=0):
   if len(dict)==0:return print()
   print("-> "+dict["id"],end='')
   if len(dict["recipe"]) == 0:return print()
   if api2_json.get(dict["recipe"][i]) is None:return
   find_recipe(api2_json[dict["recipe"][i]],i)
   i=i+1
   if len(dict["recipe"]) <= i:return
   find_recipe(api2_json[dict["recipe"][i]])

for i in api2_json:
    recipe = api2_json[i]["recipe"]
    if len(recipe) == 0:
        print(i)
    else:
        print(i,'')
    j=0
    while(len(recipe) != j and api2_json.get(recipe[j]) is not None):
        find_recipe(api2_json[recipe[j]])
        j=j+1
print()
t2 = time.time()
print(t2-t1)



import json
import class_site_output
api_prices_file = open("InputFiles/python/output/json/api_items_price.json","r")
api_prices_json = json.load(api_prices_file)


site_list = []

for i in api_prices_json:
    
    recipe ={
        "buy":[],
        "craft":[],
        "locations":[]
    }
    site_list.append(class_site_output.SiteOutput(api_prices_json[i]["ign"],api_prices_json[i]["ign"]))
