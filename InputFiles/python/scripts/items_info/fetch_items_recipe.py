import requests

def find_item_in_table(input):
    index  = input.find("id/")+3
    end = index + input[index:].find("\"")
    out = input[index:end]
    if index !=-1 or end !=-1:
        return add_enchant(out)
    return "null"

def add_enchant(item):
    if item.find("_LEVEL") == -1:
        return item
    return item+"@"+item[-1]

def trim_enchant(item):
    if item.find("_LEVEL") == -1:
        return item
    return item[:-2]

def get_recipe(string):
    string = trim_enchant(string)
    url = "https://albiononline2d.com/en/item/id/"
    response = requests.get(url+string+"/craftingrequirements")
    text=  response.text
    temp = text.find("Amount")
    if temp == -1:
        return "0"
    input= text[temp:]
    index  = input.find("<tr>")+4
    input = input[index:]
    item = ""
    out = ""
    while item != "null":   
        out += find_item_in_table(input)+" "
        index  = input.find("<tr>")+4
        if index == 3:break
        input = input[index:]

    out = out[:-2]
    return out

def exists(string,container):
    if any ( string in i for i in container):return True
    return False

items_name = open("output/text/items_id.txt","r")
bl_res = open("output/text/blacklisted_resources.txt","r")
out = open("output/text/items_recipe.txt","w")
resources = []

for i in bl_res:
    resources.append(i)
    
for i in items_name:
    if not exists(i,resources):
        recipe = get_recipe(i[:-1])+"\n"
        print(i[:-1]+" "+recipe[:-1])
        out.write(recipe)
    else: out.write("o\n")
    
out.close()
items_name.close()