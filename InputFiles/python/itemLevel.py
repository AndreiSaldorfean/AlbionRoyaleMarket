file = open("textoutput/items_ID.txt","r")
out = open("textoutput/items_Level.txt","w")

for line in file:
    if line[-2].isdigit():
        out.write(line[-2]+"\n")
    else:
        out.write("0"+"\n")
file.close()
out.close()