file = open("output/items_id.txt","r")
out = open("output/items_level.txt","w")

for line in file:
    if line[-2].isdigit():
        out.write(line[-2]+"\n")
    else:
        out.write("0"+"\n")

file.close()
out.close()