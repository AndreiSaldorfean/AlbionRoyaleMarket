import sys
import random
sys.path.append('InputFiles/python/scripts/city_travel_cost')
import class_mount
import json
MAP_FILE="InputFiles/json/cities.json"
REFINING_BONUS=1.58
CRAFTING_BONUS=1.33
MARKET_PERCENTAGE=0.92 #the market takes 8% per item
ERROR_CODE0=-1#the amount of a given item is null
ERROR_CODE1=-1000#the sum of costs is null
fin=open(MAP_FILE,"r")
map_graph=json.load(fin)
fin.close()
#=======================================================================================================
def sum_quantity(item_qunatitites):
    needed_quantity=0
    for index in item_qunatitites["buy"]:
        if index[3]>0:
            needed_quantity=needed_quantity+index[3]
        else:
            needed_quantity=ERROR_CODE0
            return needed_quantity
    for index in item_qunatitites["craft"]:
        if index[3]>0:
            needed_quantity=needed_quantity+index[3]
        else:
            needed_quantity=ERROR_CODE0
            return needed_quantity
    return needed_quantity
def buy_sum(buying_list):
    sum=0
    for item_index in buying_list:
        if (int)(item_index[3])>0:
            sum=sum+(int)(item_index[3])*(int)(item_index[4])
        else:
            sum=ERROR_CODE0
            return sum
        #[2]-amount
        #[3]-price
    return sum 
#=======================================================================================================
def compute_time(player_mount,city_buy,city_sell):
    return player_mount.city_travel_time(map_graph,city_buy,city_sell)
def compute_carrying_capacity(player_mount,item_weight):
    return (int)(player_mount.get_carry_load()/item_weight)
def compute_profit(item,investment):
    #quantity=investment/(SubItemsQuantity)
    #finalQuantity=quantity*R
    #Gain=price_sell*finalQuantity-sellTax
    #craftCost=sum(costs)
    #Profit=Gain-craftCost
   buying_list=item["recipe"]["buy"]
   crafting_list=item["recipe"]["craft"]
   price_sell=item["price_sell"]
   exists = any(item["id"] in sublist for sublist in crafting_list)
   if exists:
       cuantity=0
       total_cost=buy_sum(buying_list)#for items which are bought
       for i in range(len(crafting_list)):
           if crafting_list[i][0]==item["id"]:
               cuantity=crafting_list[i][3]
               total_cost=total_cost+crafting_list[i][4]
       gain=price_sell*cuantity*MARKET_PERCENTAGE
       return gain-total_cost
   #quantity=sum_quantity(item["recipe"])
   '''if quantity>0:
    item_amount=investment/quantity#amount of the refined item 
   else:
       item_amount=ERROR_CODE1'''
   return -1
def compute_roi(investment,profit):
    #Return on Investment
    return profit/investment
def compute_index(item):
    return -3