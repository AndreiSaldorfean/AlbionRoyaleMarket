file1 = open("textoutput/items_Tier.txt","r")
file2 = open("textoutput/items_Level.txt","r")
itemsName = open("textoutput/items_ID.txt","r")
resourcesWrapper = open("textoutput/resource_Check.txt","r")
out = open("textoutput/items_Itemvalue.txt","w")

resources = []
for i in resourcesWrapper:
    resources.append(i)

for i,j,name in zip(file1,file2,itemsName):
    if  any (name in item for item in resources):
        res = pow(2,int(i))*pow(2,int(j))
        out.write(str(res)+"\n")
    elif not any (name in item for item in resources):
        out.write("0\n")

file1.close()
file2.close()
out.close()
resourcesWrapper.close()
itemsName.close()