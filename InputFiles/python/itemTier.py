file = open("textoutput/items_ID.txt","r")
out = open("textoutput/items_Tier.txt","w")

for line in file:
    out.write(line[1]+"\n")

file.close()
out.close()