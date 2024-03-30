out = open("output/resources.txt","w")

resource_base = ["ORE","METALBAR","WOOD","PLANKS","FIBER","CLOTH","HIDE","LEATHER"]
added_level = []
result = []

for i in resource_base:
    for j in range(2,9):
        temp = "T"+str(j)+"_"+i
        added_level.append(temp)

for i in added_level:
    for j in range(0,5):
        if j == 0:
            result.append(i)
            continue
        if int(str(i)[1]) >= 4:
            temp = i+"_LEVEL"+str(j)+"@"+str(j)
            result.append(temp)

for i in result:
    out.write(i+"\n")

out.close()