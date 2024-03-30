file = open("output/items_id.txt","r")
out = open("output/items_tier.txt","w")

for line in file:
    out.write(line[1]+"\n")

file.close()
out.close()