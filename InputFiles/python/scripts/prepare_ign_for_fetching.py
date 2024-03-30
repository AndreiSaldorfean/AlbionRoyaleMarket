file = open("output/items_ign.txt","r")
out = open("output/proccessed_ign.txt","w")

for i in file:
   
    x = i.replace("'","%27")
    x = x.replace(" ","_")
    out.write(x)

file.close()
out.close()
