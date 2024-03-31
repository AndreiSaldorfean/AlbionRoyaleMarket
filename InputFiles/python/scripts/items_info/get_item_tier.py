file = open("output/text/items_id.txt","r")
out = open("output/text/items_tier.txt","w")

for line in file:
    out.write(line[1]+"\n")

file.close()
out.close()