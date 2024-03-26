file = open("input.txt","r")
outID = open("textoutput/items_ID.txt","w")
outIGN = open("textoutput/items_IGName.txt","w")
data = []
lineList = []
itemNames = []
blacklistedItems = ["ROCK", "STONEBLOCK"] 
mustHave=["T2_","T3_","T4_","T5_","T6_","T7_","T8_"]

for line in file:
    data.append(line.strip("\n"))
for i in data:
    lineList.append(i.split(":"))
for i in range(0,len(lineList)):
    if not any(item in lineList[i][1] for item in blacklistedItems) and any(item in lineList[i][1] for item in mustHave):
        lineList[i][1] = str(lineList[i][1]).strip()
        lineList[i][2] = str(lineList[i][2]).strip()
        outID.write(lineList[i][1]+"\n")
        outIGN.write(lineList[i][2]+"\n")
file.close()
outID.close()
outIGN.close()