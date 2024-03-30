import requests

def find_weight_in_http_request(response):
    index = response.find("Weight")+16
    return index

def get_item_weight(item):
    url = "https://wiki.albiononline.com/wiki/"
    response = requests.get(url+item)
    start = find_weight_in_http_request(response.text)
    text = response.text[start:]
    if start == -1:return "-1"
    end = text.find("</dd>")
    out = text[:end-3]
    if len(out)>100:out="-1"
    return out

file = open("output/proccessed_ign.txt","r")
out = open("output/items_weight.txt","w")

for i in file:
    item_weight = get_item_weight(i[:-1])
    print(i[:-1]+" "+item_weight+"\n")
    out.write(item_weight+"\n")

file.close()
out.close()
