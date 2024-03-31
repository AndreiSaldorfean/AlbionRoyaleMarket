import requests

def find_item_in_table(input):
    index  = input.find("<td>")+4
    index  = index + input[index:].find("<td>")+4
    index  = index + input[index:].find("<td>")+4
    end = index + input[index:].find("</")
    out = input[index:end]
    if index !=-1 or end !=-1:
        return out
    return "null"

def trim_enchant(item):
    if item.find("_LEVEL") == -1:
        return item
    return item[:-2]

def get_weight(string):
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
    out = ""
    while 1:   
        out += find_item_in_table(input)+" "
        index = input.find("<tr>")+4
        input = input[index:]
        if index == 3 or input.find("</tbody>")==-1:break

    out = out[:-1]
    return out

def exists(string,container):
    if any ( string in i for i in container):return True
    return False

items_name = open("output/text/items_id.txt","r")
res = open("output/text/blacklisted_items.txt","r")
out = open("output/text/items_crafting_amount.txt","w")
resources = []

for i in res:
    resources.append(i)
    
for i in items_name:
    if not exists(i,resources):
        write = get_weight(i[:-1])+"\n"
        print(i[:-1]+" "+write[:-1])
        out.write(write)
    else: out.write("o\n")
    
out.close()
items_name.close()