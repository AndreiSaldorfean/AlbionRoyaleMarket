out = open("textoutput/resource_Check.txt","w")

resourceBase = ["ORE","METALBAR","WOOD","PLANKS","FIBER","CLOTH","HIDE","LEATHER"]
addLevel = []
result = []

for i in resourceBase:
    for j in range(2,9):
        temp = "T"+str(j)+"_"+i
        addLevel.append(temp)

for i in addLevel:
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