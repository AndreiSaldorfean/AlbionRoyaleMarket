import json
import requests
import time#OBS:perf_counter() is prefered over time()
QUALITY=1
URL_LIMIT=4096#based on indication found at https://www.albion-online-data.com/
URL_BEGIN="https://west.albion-online-data.com/api/v2/stats/Prices/"
URL_END=".json?locations=Caerleon,Martlock,Bridgewatch,Lymhurst,Fort Sterling,Thetford&qualities=QUALITY"
items_list=[]#used for storing information about item id,name,city
final_items_list=[]#the file which will be transmited to the user
def generate_items_list():#used for gathering items ID
    fin=open("items_info_list.json")
    buffer=json.load(fin)
    buffer_length=len(buffer)
    for i in range(buffer_length):
        items_list.append(buffer[i]) 
    fin.close()
def append_file(data_request):#used for appending data to the prices.json file
    buffer=data_request.json()
    buffer=json.dumps(buffer,indent=1)
    buffer=buffer.replace("[","")
    buffer=buffer.replace("]",",")
    with open("temp.json","a") as fout:
        fout.write(buffer)
    fout.close()

def data_fetching():#used for fetching data via API
    #without any threads or multiple processes,there are 40 requests
    with open("temp.json","a") as fout:
        fout.write("[")
    fout.close()
    url_size=URL_LIMIT-len(URL_END)
    max_index=len(items_list)
    url=URL_BEGIN
    index=0#used for indexing through .json file
    while index<=max_index-1:
        if(len(url+items_list[index]["item_id"]+URL_END)<URL_LIMIT):
            url=url+items_list[index]["item_id"]+","
            index=index+1
        else:
            url=url[:-1]#removing "," for the last item
            data_request=requests.get(url)
            append_file(data_request)
            url=URL_BEGIN
    with open("temp.json","a") as fout:
        fout.write("]")
    fout.close()
generate_items_list()
data_fetching()
#final_items_list=json.load(open("temp.json"))
#print(len(final_items_list))