#This module doesnt calculate the item value for armors and weapons, 
#so in the input file the armors and weapons must be deleted.
import requests

def get_item_value(string):
    url = "https://albiononline2d.com/en/item/id/"
    response = requests.get(url+string)
    start = response.text.find("itemvalue")+18
    end = response.text.find("<",start)
    return response.text[start:end]

def is_resource(item):
    if any (item in i for i in resources):
        return True
    return False

file1 = open("output/text/items_tier.txt","r")
file2 = open("output/text/items_level.txt","r")
items_name = open("output/text/items_id.txt","r")
resources_wrapper = open("output/text/resource.txt","r")
out = open("output/text/items_iv.txt","w")
resources = []

for i in resources_wrapper:
    resources.append(i)

for i,j,name in zip(file1,file2,items_name):
    if is_resource(name):
        res = pow(2,int(i))*pow(2,int(j))
        print(name+"\n")
        out.write(str(res)+"\n")
    elif not is_resource(name):
        item_value = get_item_value(name[:-1])
        print(name+"\n")
        out.write(item_value+"\n")


file1.close()
file2.close()
out.close()
resources_wrapper.close()
items_name.close()