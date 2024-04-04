#this script assigns the crafting station where the item is crafted 
def path_for_item(item,dict):
    for path in dict:
        if item in dict[path]:return path
    return "none"

categories_file   = open("InputFiles/python/output/text/items_category.txt","r")
out               = open("InputFiles/python/output/text/items_crafting_station.txt","w")
crafting_stations = {
    "hunter":
        [
            "bow","quarterstaff","dagger",
            "naturestaff","spear","torch","leather_shoes","leather_armor",
            "leather_helmet","horn"
        ],
    "mage":
        [
            "arcanestaff","cursestaff","firestaff",
            "froststaff","holystaff","book","cloth_shoes","cloth_armor",
            "cloth_helmet","totem","orb"
        ],
    "warrior":
        [
            "sword","axe","mace","knuckles","hammer",
            "crossbow","shield","plate_shoes","plate_armor",
            "plate_helmet"
        ],
    "lumbermill":"wood",
    "smelter":"ore",
    "weaver":"fiber",
    "tanner":"hide",
    "toolmaker":
        [
            "bag","cape",
            
            "oregatherer_helmet","oregatherer_backpack","oregatherer_shoes",
            "oregatherer_armor",

            "fibergatherer_helmet",
            "fibergatherer_shoes","fibergatherer_armor","fibergatherer_backpack",

            "hidegatherer_helmet",
            "hidegatherer_shoes","hidegatherer_armor","hidegatherer_backpack",

            "woodgatherer_helmet","woodgatherer_shoes","woodgatherer_armor",
            "woodgatherer_backpack",

            "fishgatherer_helmet","fishgatherer_shoes","fishgatherer_armor",
            "fishgatherer_backpack"
        ]
    
    }
categories=[]

for i in categories_file:
    categories.append(i[:-1])
for i in categories:
    out.write(path_for_item(i,crafting_stations)+"\n")

