import time
import json
t1 = time.time()

api2_file    = open("InputFiles/python/output/json/api_items_price.json","r")
api2_json   = json.load(api2_file)

def find_recipe(dict,i=0):
   if len(dict)==0:return print()
   print("-> "+dict["id"],end='')
   if len(dict["recepie"]) == 0:return print()
   if api2_json.get(dict["recepie"][i]) is None:return
   find_recipe(api2_json[dict["recepie"][i]],i)
   i=i+1
   if len(dict["recepie"]) <= i:return
   find_recipe(api2_json[dict["recepie"][i]])

for i in api2_json:
    recepie = api2_json[i]["recepie"]
    if len(recepie) == 0:
        print(i)
    else:
        print(i,'')
    j=0
    while(len(recepie) != j and api2_json.get(recepie[j]) is not None):
        find_recipe(api2_json[recepie[j]])
        j=j+1
print()
t2 = time.time()
print(t2-t1)
