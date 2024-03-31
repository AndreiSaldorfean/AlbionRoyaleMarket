def find(string,container):
    for i in range(0,len(container)):
       if string == container[i]:return i
    return -1

def sygil_iv(sygil):
    tier = sygil[-1]
    match tier:
        case "4":
            return "16"
        case "5":
            return "16"
        case "6":
            return "16"
        case "7":
            return "32"
        case "8":
            return "64"

def find_resource_iv(resource):
    if str(resource).find("QUESTITEM_TOKEN_ROYAL") !=-1:
        return sygil_iv(resource)
    if str(resource).find("FACTION") != -1:return 0

    index = find(resource,items_id)
    if resource[-1].isnumeric() and find(resource,res) == -1 and index != -1:
        resource+="@"+resource[-1]
    a=items_iv[index]
    if str(items_iv[index]).find("k") != -1:
        b = items_iv[index]
        a = float(b[:-1])*1000
    iv = a
    return float(iv)
        
def get_iv(recepies,amounts):
    if amounts == "0": return -1
    recepie = str(recepies).split(" ")
    amount = str(amounts).split(" ")
    sum=0
    for i in range(0,len(recepie)):
        temp = find_resource_iv(recepie[i])
        iv = float(temp)*int(amount[i])
        sum +=int(iv)
    return int(sum)

file1 = open("output/text/items_recepie.txt","r")
file2 = open("output/text/items_id.txt","r")
file3 = open("output/text/items_iv.txt","r")
file4 = open("output/text/items_crafting_amount.txt","r")
file5 = open("output/text/items_ign.txt","r")
file6 = open("output/text/resources.txt","r")
out = open("output/text/items_iv_2.txt","w")
recepie = []
items_id = []
items_iv = []
items_ign = []
res = []
amount = []

for i in file1:
    recepie.append(i[:-1])

for i in file2:
    items_id.append(i[:-1])
    
for i in file3:
    items_iv.append(i[:-1])

for i in file4:
    amount.append(i[:-1])

for i in file5:
    items_ign.append(i[:-1])

for i in file6:
    res.append(i[:-1])

for i in range(836,len(recepie)):
    if recepie[i]=="o":
        continue
        
    temp = get_iv(recepie[i],amount[i])
    if str(recepie[i]).find("QUESTITEM_TOKEN_ROYAL") !=-1:
        old = str(recepie[i]).split(" ")
        lvl =""
        if items_id[i][-1].isnumeric():
            lvl = "@"+items_id[i][-1]
        fixed= str(recepie[i]).replace(old[0],(old[0]+lvl))
        temp = get_iv(fixed,amount[i])

    out.write(str(temp)+"\n")
    
    