import json
import requests
import os
import time#OBS:perf_counter() is prefered over time()
QUALITY=1
FILE_PATH="../..//output//json//"
FILE_NAME=FILE_PATH+"fetched_prices.json"
URL_LIMIT=4096#based on indication found at https://www.albion-online-data.com/
URL_BEGIN="https://west.albion-online-data.com/api/v2/stats/Prices/"
URL_END=".json?locations=Caerleon,Martlock,Bridgewatch,Lymhurst,Fort%20Sterling,Thetford&qualities=1"
items_list=[]#used for storing information about item id,name,city
with open(FILE_NAME,"w") as fout:#formating the .json file
    fout.write("[")
    fout.close()
#============================================================================================    
def generate_items_list():#used for gathering items ID
    fin=open("../..//output//json//items_info_list.json")
    buffer=json.load(fin)
    buffer_length=len(buffer)
    for i in range(buffer_length):
        items_list.append(buffer[i]) 
    fin.close()
def append_file(data_request):#used for appending data to the prices.json file
    buffer=data_request.json()
    buffer=json.dumps(buffer,indent=4)
    #json.dumps({ID:"VAL"},indent=4)
    buffer=buffer.replace("[","")
    buffer=buffer.replace("]",",")
    with open(FILE_NAME,"a") as fout:
        fout.write(buffer)
    fout.close()

def data_fetching():#used for fetching data via API
    #without any threads or multiple processes,there are 40 requests
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
            url=url+URL_END
            data_request=requests.get(url)
            print(data_request.status_code)
            append_file(data_request)
            url=URL_BEGIN
generate_items_list()
data_fetching()
#============================================================================================
with open(FILE_NAME, 'rb+') as file:#formating the .json file
    file.seek(-1, os.SEEK_END)
    file.truncate()
    file.close()
with open(FILE_NAME,"a") as fout:
    fout.write("]")
    fout.close()