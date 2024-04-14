#I classified:
#    -materials: planks,leather,matalbar and cloth.
#    -resources: hide,fiber,ore and wood.
#    -items: equipment(armor,bags and capes) and weapons. I sometimes refer to items as all different items materials and resources included
#            it depends of the context, but i think it is clear enough when i do refer to equipment and weapons and when i refer to all items.
#
#There are some items that dont work(artefact capes, bags of insight and royal equipment) yet and i will fix it later some time. 
#
#
#This script creates a list items (all items, material and resources included) a player needs to buy and craft.
#The output of this script is items_recipe and materials_recipe
import json

#returns price per craft
#ppc is the difference between the market price of an item
#compared to the price that you need to craft that item
#ex:
#The market price for T2_LEATHER=30s;
#When the market price for T2_HIDE=20s
#And you need 2k T2_LEATHER. IF you craft 1265(=2k/1.58) T2_LEATHER 
#It is as if you bought from the market 2k T2_LEATHER with a price of 12.65s per item
#12.65 =(1265*20)/2000;
def get_ppc(dict,list):
    ppc = 0
    for i in dict["recipe"]:
        ppc += float(list[i]["price_buy"])*float(dict["recipe"][i]["amount"])
    return ppc

#returns the number of items you can craft with provided investment
def get_crafting_amount(dict,investment,rrr,list):

    price_per_craft = get_ppc(dict,list)
    if price_per_craft == 0 :return -1
    crafting_amount = investment/price_per_craft
    return crafting_amount*rrr

def process_item_result(wrapper):
    mat_wrapper = wrapper[1]
    buy_list   = []
    craft_list = []
    if mat_wrapper.__len__() != 0:
        for i in mat_wrapper[0]:
            buy_list.append(i)
        for i in mat_wrapper[1]:
            craft_list.append(i)
    for i in wrapper[0]:
        craft_list.append(i)
    return (buy_list,craft_list)

#item = equipment or weapons
def find_item_recipe(dict,nca):
    if len(dict)==0:return []
    if len(dict["recipe"]) == 0:return []
    mat_wrapper = ()
    craft_list = []
    if not any(dict["category"] in j for j in blacklist):
        craft_list.append(
            [
                dict["id"], 
                dict["city_buy"], 
                nca*1.58, 
                dict["price_buy"], 
                nca*1.58*dict["crafting_tax"]
            ])
    for i in dict["recipe"]:
        temp_buy    = []
        if str(fetched_prices[i]["category"]).find("artefact") !=-1:
            mat_wrapper[0].append(
                [
                    i,                             #item name
                    fetched_prices[i]["city_buy"], #city to buy from
                    nca,                           #amount
                    fetched_prices[i]["price_buy"] #price buy
                ])
        else:
            mat_wrapper = find_material_recipe(fetched_prices[i],fetched_prices,nca/REFINING_BONUS,[])
            if mat_wrapper.__len__() != 0:
                prettyfy(mat_wrapper)
    wrapper = (craft_list,mat_wrapper)
    if wrapper.__len__() !=0:
        return process_item_result(wrapper)
    return ()

def process_material_result(wrapper):        
    craft_list     = wrapper[0]
    buy_list       = wrapper[1]
    new_craft_list = []
    new_buy_list   = [] 
    craft_list     = craft_list[::-1]
    buy_list       = buy_list[::-1]
    market_price   = craft_list[0][2] * craft_list[0][3]
    craft_price    = buy_list[0][2]   * buy_list[0][3]

    if craft_price < market_price:
        new_buy_list.append(buy_list[0])
        craft_list[0][3] = craft_price / craft_list[0][2]
        buy_list.remove(buy_list[0])
    else:
        new_buy_list.append(craft_list[0])
        buy_list.remove(buy_list[0])

    while(craft_list.__len__() != 0):
        mat_price = craft_list[0][2]*craft_list[0][3]
        for j in buy_list:
            res_price    = j[2]*j[3]
            craft_price  = mat_price+res_price
            market_price = craft_list[1][2]*craft_list[1][3]
            if craft_price < market_price:
                new_buy_list.append(j)
                new_craft_list.append(craft_list[1])
                craft_list.remove(craft_list[0])
                buy_list.remove(buy_list[0])
            else:
                new_buy_list.append(craft_list[1])
                craft_list.remove(craft_list[0])
                buy_list.remove(buy_list[0])
        if(buy_list.__len__()==0):
            break
    buy_list   = new_buy_list
    craft_list = new_craft_list
    if craft_list == []:
        return ()
    
    return buy_list,craft_list

def find_material_recipe(dict,list,nca,resource_ingredients=[],ok=1):
    if len(dict)==0:return []
    if len(dict["recipe"]) == 0:return []
    if any(dict["category"] in j for j in materials_list):
        craft_list.append(
            [       dict["id"],                        #item name
                    dict["city_buy"],                  #city to buy the item from
                    nca*1.58,                          #amount to buy
                    dict["price_buy"],                 #item price
                    int(nca*1.58*dict["crafting_tax"]) #crafting tax
            ])
    for i in dict["recipe"]:
        amount = float(dict["recipe"][i]["amount"])*float(nca)
        if any(list[i]["category"] in j for j in resource_list):
            resource_ingredients.append( 
                [   i,                          #item name
                    list[i]["city_buy"],        #city to buy the item from
                    amount,                     #amount to buy
                    list[i]["price_buy"],       #item price
                ])
        if(amount/REFINING_BONUS != 0):
            find_material_recipe(list[i], list, amount/REFINING_BONUS,resource_ingredients,0)
    if(ok==1):
        wrapper = (craft_list,resource_ingredients)
        return process_material_result(wrapper) 
    return ()

def validate_item(dict,list,ok=1):
    for i in dict["recipe"]:
        if list.get(i) is None:
            return 0
        if not any(list[i]["category"] in item for item in [resource_list + artefacts]):
            ok = validate_item(list[i],list,ok)
    if ok == 0:
        return 0
    return 1

def prettyfy(wrapper):
    for i, element in enumerate(wrapper[0]):
        if len(element) == 5:
            wrapper[0][i] = element[:-1]
        wrapper[0][i][2] = int(wrapper[0][i][2])

    for i, element in enumerate(wrapper[1]):
        wrapper[1][i][2] = int(wrapper[1][i][2])
        wrapper[1][i][4] = int(wrapper[1][i][4])

api_prices_file = open("InputFiles/python/output/json/api_items_price.json","r")
site_input_file = open("InputFiles/python/output/json/site_input.json","r")
fetched_prices  = json.load(api_prices_file)
site_input_json = json.load(site_input_file)
REFINING_BONUS  = 1.58
CRAFTING_BONUS  = 1.33

resource_list    = ["wood","ore","fiber","hide"]
artefacts        = ["magic_artefact","ranged_artefact","melee_artefact",
                   "offhand_artefact","armor_artefact","other"]
materials_list   = ["planks","metalbar","cloth","leather"]
blacklist        = resource_list + artefacts+materials_list
materials        = {}
materials_recipe = {}
items_recipe     = {}
items            = {}

for i in fetched_prices:
    if any(fetched_prices[i]["category"] in item for item in materials_list):
        materials[i] = fetched_prices[i]

for i in fetched_prices:
    if not any(fetched_prices[i]["category"] in item for item in blacklist):
        items[i] = fetched_prices[i]

for i in materials:
    if not validate_item(materials[i],fetched_prices):
        continue
    buy_list      = []
    craft_list    = []

    #gross crafting amount (gca)
    gca = get_crafting_amount(materials[i],
                              site_input_json["investment"],
                              REFINING_BONUS,fetched_prices)
    #net crafting amount (nca)
    nca = gca/REFINING_BONUS

    #this function does the heavy lifting.It's output is in buy_list and craft_list
    #in the format:
    #           resource_name,   amounts_to_buy  city_bought   price
    #buy_list:[["T2_HIDE",       333           ,"Lymhurst",    30]]
    #               
    #             material_name   price_per_craft
    #craft_list:[["T2_LEATHER",   18]]
    #
    #The principle is that you feed it the net crafting amount that you can craft with the investment you have 
    #available and the function returns the resources/material you need to buy for the material you want to craft.
    wrapper = find_material_recipe(fetched_prices[i],fetched_prices,nca,[])
    if wrapper.__len__() == 0:
        continue
    prettyfy(wrapper)
    buy_list   = wrapper[0]
    craft_list = wrapper[1]
    recipe = {
        "buy"   :buy_list,
        "craft" :craft_list
    }
    materials_recipe[i] = recipe

for i in items:
    if not validate_item(items[i],fetched_prices):
        continue
    if str(i).find("CAPEITEM") !=-1 or str(i).find("BAG_INSIGHT") !=-1 or str(i).find("ROYAL") !=-1:continue
    #gross crafting amount
    gca = get_crafting_amount(items[i],
                              site_input_json["investment"],
                              CRAFTING_BONUS,fetched_prices)
    #net crafting amount
    nca = gca/CRAFTING_BONUS
    buy_list   = []
    craft_list = []
    
    #the principle is the same
    if i == "T4_MAIN_RAPIER_MORGANA@1":
        pass
    wrapper    = find_item_recipe(items[i],nca)
    buy_list   = wrapper[0]
    craft_list = wrapper[1]
    prettyfy(wrapper)
    recipe = {
        "buy"   :buy_list,
        "craft" :craft_list
    }
    items_recipe[i] = recipe